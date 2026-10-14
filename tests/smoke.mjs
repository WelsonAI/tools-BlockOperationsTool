import fs from "node:fs/promises";

const endpoint = "http://127.0.0.1:9223";
const pageUrl = "http://127.0.0.1:8788";

const target = await fetch(`${endpoint}/json/new?${encodeURIComponent(pageUrl)}`, { method: "PUT" }).then(response => {
  if (!response.ok) throw new Error(`Could not create Chrome target: ${response.status}`);
  return response.json();
});

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let requestId = 0;
const pending = new Map();
const runtimeErrors = [];

socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
    return;
  }
  if (message.method === "Runtime.exceptionThrown") {
    runtimeErrors.push(message.params.exceptionDetails.text);
  }
  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
    runtimeErrors.push(message.params.entry.text);
  }
});

function send(method, params = {}) {
  requestId += 1;
  const id = requestId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression, awaitPromise = true) {
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
    userGesture: true
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

async function waitFor(expression, timeout = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Timed out waiting for: ${expression}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function screenshot(path) {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path, Buffer.from(data, "base64"));
}

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
await waitFor(`document.readyState === "complete"`);

const initial = await evaluate(`({
  equation: document.querySelector("#equation").textContent.trim(),
  result: document.querySelector("#resultValue").textContent.trim(),
  imagesLoaded: [...document.images].every(image => image.complete && image.naturalWidth > 0),
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
})`);
assert(initial.equation.includes("28 + 6 = ?"), "Initial addition equation is incorrect.");
assert(initial.result === "?", "Answer should be hidden before the operation.");
assert(initial.imagesLoaded, "One or more block assets failed to load.");
assert(!initial.horizontalOverflow, "Desktop layout has horizontal overflow.");

await evaluate(`document.querySelector("#buildBtn").click()`);
const dragPoints = await evaluate(`(() => {
  const block = document.querySelector('[data-role="sourceA"][data-place="one"] .math-block');
  const target = document.querySelector('[data-role="result"][data-place="one"]');
  const from = block.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  return {
    fromX: from.left + from.width / 2,
    fromY: from.top + from.height / 2,
    toX: to.left + to.width / 2,
    toY: to.top + Math.min(90, to.height / 2)
  };
})()`);
await send("Input.dispatchMouseEvent", { type: "mousePressed", x: dragPoints.fromX, y: dragPoints.fromY, button: "left", buttons: 1, clickCount: 1 });
for (let step = 1; step <= 6; step += 1) {
  const progress = step / 6;
  await send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: dragPoints.fromX + (dragPoints.toX - dragPoints.fromX) * progress,
    y: dragPoints.fromY + (dragPoints.toY - dragPoints.fromY) * progress,
    button: "left",
    buttons: 1
  });
}
await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: dragPoints.toX, y: dragPoints.toY, button: "left", buttons: 0, clickCount: 1 });
await waitFor(`document.querySelectorAll('[data-role="result"][data-place="one"] .math-block').length === 1`);
await evaluate(`(() => {
  const blocks = [...document.querySelectorAll('[data-role="sourceA"][data-place="one"] .math-block, [data-role="sourceB"][data-place="one"] .math-block')];
  blocks.forEach(block => block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
  return blocks.length;
})()`);
await waitFor(`!document.querySelector("#exchangeBtn").hidden`);
const addExchangeLabel = await evaluate(`document.querySelector("#exchangeBtn").textContent.trim()`);
assert(addExchangeLabel.includes("10") && addExchangeLabel.includes("1"), "Addition regrouping demo is missing.");
await screenshot(new URL("addition-before-regroup.png", import.meta.url));

await evaluate(`document.querySelector("#exchangeBtn").click()`);
await waitFor(`document.querySelector("#exchangeBtn").hidden && !document.querySelector("#nextBtn").disabled`, 7000);
const regroupedAddition = await evaluate(`({
  ones: document.querySelectorAll('[data-role="result"][data-place="one"] .math-block').length,
  tens: document.querySelectorAll('[data-role="result"][data-place="ten"] .math-block').length
})`);
assert(regroupedAddition.ones === 4 && regroupedAddition.tens === 1, "10 ones were not exchanged for 1 ten correctly.");

await evaluate(`document.querySelector("#nextBtn").click()`);
await evaluate(`(() => {
  const blocks = [...document.querySelectorAll('[data-role="sourceA"][data-place="ten"] .math-block, [data-role="sourceB"][data-place="ten"] .math-block')];
  blocks.forEach(block => block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
})()`);
await waitFor(`!document.querySelector("#nextBtn").disabled`);
await evaluate(`document.querySelector("#nextBtn").click()`);
const additionComplete = await evaluate(`({
  equation: document.querySelector("#equation").textContent.trim(),
  result: document.querySelector("#resultValue").textContent.trim(),
  formulaEnabled: !document.querySelector("#formulaBtn").disabled
})`);
assert(additionComplete.equation.includes("28 + 6 = 34"), "Addition result is incorrect.");
assert(additionComplete.result === "34", "Addition answer was not revealed after completion.");
assert(additionComplete.formulaEnabled, "Vertical-form button should unlock after completion.");

await evaluate(`document.querySelector("#formulaBtn").click()`);
assert(await evaluate(`!document.querySelector("#formulaModal").hidden`), "Formula modal did not open.");
await evaluate(`document.querySelector("#modalClose").click()`);

await evaluate(`document.querySelector('[data-operation="subtraction"]').click()`);
assert(await evaluate(`document.querySelector('#rangeSelect option[value="1000"]').disabled`), "Within-1000 subtraction should be disabled because it is not in the supplied material.");
await evaluate(`(() => {
  document.querySelector("#numberA").value = "32";
  document.querySelector("#numberB").value = "9";
  document.querySelector("#buildBtn").click();
})()`);
await waitFor(`!document.querySelector("#exchangeBtn").hidden`);
const subtractExchangeLabel = await evaluate(`document.querySelector("#exchangeBtn").textContent.trim()`);
assert(subtractExchangeLabel.includes("1") && subtractExchangeLabel.includes("10"), "Subtraction regrouping demo is missing.");

await evaluate(`document.querySelector("#exchangeBtn").click()`);
await waitFor(`document.querySelectorAll('[data-role="minuend"][data-place="one"] .math-block').length === 12`, 7000);
const splitSubtraction = await evaluate(`({
  ones: document.querySelectorAll('[data-role="minuend"][data-place="one"] .math-block').length,
  tens: document.querySelectorAll('[data-role="minuend"][data-place="ten"] .math-block').length
})`);
assert(splitSubtraction.ones === 12 && splitSubtraction.tens === 2, "1 ten was not split into 10 ones correctly.");
await screenshot(new URL("subtraction-after-regroup.png", import.meta.url));

await evaluate(`(() => {
  const blocks = [...document.querySelectorAll('[data-role="minuend"][data-place="one"] .math-block')].slice(0, 9);
  blocks.forEach(block => block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
})()`);
await waitFor(`!document.querySelector("#nextBtn").disabled`);
await evaluate(`document.querySelector("#nextBtn").click()`);
await waitFor(`!document.querySelector("#nextBtn").disabled`);
await evaluate(`document.querySelector("#nextBtn").click()`);
const subtractionComplete = await evaluate(`({
  equation: document.querySelector("#equation").textContent.trim(),
  remainingOnes: document.querySelectorAll('[data-role="minuend"][data-place="one"] .math-block').length,
  remainingTens: document.querySelectorAll('[data-role="minuend"][data-place="ten"] .math-block').length,
  removed: document.querySelector("#removedProgress").textContent.trim()
})`);
assert(subtractionComplete.equation.includes("32") && subtractionComplete.equation.includes("9") && subtractionComplete.equation.includes("23"), "Subtraction result is incorrect.");
assert(subtractionComplete.remainingOnes === 3 && subtractionComplete.remainingTens === 2, "Remaining subtraction blocks do not show 23.");
assert(subtractionComplete.removed === "9 / 9", "Subtraction progress is incorrect.");

await evaluate(`document.querySelector('[data-operation="addition"]').click()`);
await evaluate(`(() => {
  document.querySelector("#rangeSelect").value = "1000";
  document.querySelector("#rangeSelect").dispatchEvent(new Event("change", { bubbles: true }));
  document.querySelector("#numberA").value = "182";
  document.querySelector("#numberB").value = "193";
  document.querySelector("#buildBtn").click();
})()`);
const hundredColumns = await evaluate(`document.querySelectorAll('#sourceAGrid [data-place="hundred"]').length`);
assert(hundredColumns >= 2, "Within-1000 addition did not create the hundreds place.");

await evaluate(`(() => {
  const movePlace = place => {
    const blocks = [...document.querySelectorAll('[data-role="sourceA"][data-place="' + place + '"] .math-block, [data-role="sourceB"][data-place="' + place + '"] .math-block')];
    blocks.forEach(block => block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
  };
  movePlace("one");
})()`);
await waitFor(`!document.querySelector("#nextBtn").disabled`);
await evaluate(`document.querySelector("#nextBtn").click()`);
await evaluate(`(() => {
  const blocks = [...document.querySelectorAll('[data-role="sourceA"][data-place="ten"] .math-block, [data-role="sourceB"][data-place="ten"] .math-block')];
  blocks.forEach(block => block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
})()`);
await waitFor(`!document.querySelector("#exchangeBtn").hidden`);
await evaluate(`document.querySelector("#exchangeBtn").click()`);
await waitFor(`document.querySelector("#exchangeBtn").hidden && !document.querySelector("#nextBtn").disabled`, 7000);
const tensRegroup = await evaluate(`({
  tens: document.querySelectorAll('[data-role="result"][data-place="ten"] .math-block').length,
  hundreds: document.querySelectorAll('[data-role="result"][data-place="hundred"] .math-block').length
})`);
assert(tensRegroup.tens === 7 && tensRegroup.hundreds === 1, "10 tens were not exchanged for 1 hundred correctly.");
await evaluate(`document.querySelector("#nextBtn").click()`);
await evaluate(`(() => {
  const blocks = [...document.querySelectorAll('[data-role="sourceA"][data-place="hundred"] .math-block, [data-role="sourceB"][data-place="hundred"] .math-block')];
  blocks.forEach(block => block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
})()`);
await waitFor(`!document.querySelector("#nextBtn").disabled`);
await evaluate(`document.querySelector("#nextBtn").click()`);
assert((await evaluate(`document.querySelector("#equation").textContent.trim()`)).includes("182 + 193 = 375"), "Within-1000 addition result is incorrect.");

await evaluate(`document.querySelector('[data-lang="bm"]').click()`);
assert((await evaluate(`document.documentElement.lang`)) === "ms", "BM language switch did not apply.");
await evaluate(`document.querySelector('[data-lang="en"]').click()`);
assert((await evaluate(`document.documentElement.lang`)) === "en", "English language switch did not apply.");
await evaluate(`document.querySelector('[data-lang="zh"]').click()`);
assert((await evaluate(`document.documentElement.lang`)) === "zh-CN", "Chinese language switch did not apply.");

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await new Promise(resolve => setTimeout(resolve, 150));
const mobile = await evaluate(`({
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  width: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth
})`);
assert(!mobile.horizontalOverflow, `Mobile layout overflows horizontally (${mobile.scrollWidth}px > ${mobile.width}px).`);
await screenshot(new URL("mobile.png", import.meta.url));

assert(runtimeErrors.length === 0, `Runtime errors: ${runtimeErrors.join(" | ")}`);

console.log(JSON.stringify({
  ok: true,
  initial,
  regroupedAddition,
  additionComplete,
  splitSubtraction,
  subtractionComplete,
  tensRegroup,
  mobile,
  runtimeErrors
}, null, 2));

await send("Page.close");
socket.close();
