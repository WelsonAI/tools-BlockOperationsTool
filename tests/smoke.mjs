import fs from "node:fs/promises";

const endpoint = "http://127.0.0.1:9223";
const pageUrl = "http://127.0.0.1:8788";
const target = await fetch(`${endpoint}/json/new?${encodeURIComponent(pageUrl)}`, { method: "PUT" }).then(response => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let requestId = 0;
const pending = new Map();
const errors = [];
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  } else if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
  else if (message.method === "Log.entryAdded" && message.params.entry.level === "error") errors.push(message.params.entry.text);
});

function send(method, params = {}) {
  const id = ++requestId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
async function evaluate(expression) {
  const response = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}
async function waitFor(expression, timeout = 7000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 60));
  }
  throw new Error(`Timed out: ${expression}`);
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
async function screenshot(path) {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(new URL(path, import.meta.url), Buffer.from(data, "base64"));
}
async function drag(fromSelector, toSelector) {
  const points = await evaluate(`(async () => {
    const from = document.querySelector(${JSON.stringify(fromSelector)});
    const to = document.querySelector(${JSON.stringify(toSelector)});
    if (!from || !to) throw new Error("Missing drag source or target");
    from.scrollIntoView({ block: "center", inline: "nearest" });
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    return { fromX: a.left + a.width / 2, fromY: a.top + a.height / 2,
      toX: b.left + b.width / 2, toY: b.top + Math.min(b.height / 2, 70) };
  })()`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: points.fromX, y: points.fromY, button: "none", buttons: 0 });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: points.fromX, y: points.fromY, button: "left", buttons: 1, clickCount: 1 });
  for (let step = 1; step <= 8; step += 1) {
    const fraction = step / 8;
    await send("Input.dispatchMouseEvent", {
      type: "mouseMoved", x: points.fromX + (points.toX - points.fromX) * fraction,
      y: points.fromY + (points.toY - points.fromY) * fraction,
      button: "left", buttons: 1
    });
  }
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: points.toX, y: points.toY, button: "left", buttons: 0, clickCount: 1 });
}
async function pressFirst(selector, count) {
  for (let index = 0; index < count; index += 1) {
    const found = await evaluate(`(() => {
      const block = document.querySelector(${JSON.stringify(selector)});
      if (!block) return false;
      block.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      return true;
    })()`);
    assert(found, `No block found for ${selector}, step ${index + 1}`);
  }
}
async function setNumbers(a, b) {
  await evaluate(`(() => {
    document.querySelector("#numberA").value = ${JSON.stringify(a)};
    document.querySelector("#numberB").value = ${JSON.stringify(b)};
    document.querySelector("#buildBtn").click();
  })()`);
}

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1050, deviceScaleFactor: 1, mobile: false });
  await waitFor(`document.readyState === "complete" && document.querySelectorAll(".math-block").length > 0`);

  const initial = await evaluate(`({
    equation: document.querySelector("#equation").textContent,
    formula: document.querySelector("#verticalFormula").textContent,
    noRange: !document.querySelector("#rangeSelect"),
    noExchangeButton: !document.querySelector("#exchangeBtn"),
    stepsVertical: document.querySelectorAll(".step-list li")[0].getBoundingClientRect().top < document.querySelectorAll(".step-list li")[1].getBoundingClientRect().top,
    imagesLoaded: [...document.images].every(image => image.complete && image.naturalWidth > 0),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  })`);
  assert(initial.equation.includes("28 + 6 = ?"), "Blocks should be ready with the answer hidden.");
  assert(initial.formula.includes("?"), "The vertical working should be visible before the answer.");
  assert(initial.noRange && initial.noExchangeButton && initial.stepsVertical, "The old gated layout is still present.");
  assert(initial.imagesLoaded && !initial.overflow, "Initial assets or desktop layout failed.");
  await screenshot("redesign-desktop.png");

  await drag('[data-role="sourceA"][data-index="0"] .math-block', '[data-role="result"][data-index="0"]');
  await waitFor(`document.querySelectorAll('[data-role="result"][data-index="0"] .math-block').length === 1`);
  await pressFirst('[data-role="sourceA"][data-index="0"] .math-block, [data-role="sourceB"][data-index="0"] .math-block', 13);
  await waitFor(`document.querySelector('[data-role="result"][data-index="0"] .carry-bundle') !== null`);
  await screenshot("redesign-carry-ready.png");
  assert(await evaluate(`document.querySelector('#verticalFormula').textContent.includes('+')`), "Live vertical working did not show the addition.");
  await drag('[data-role="result"][data-index="0"] .carry-bundle', '[data-role="result"][data-index="1"]');
  await waitFor(`document.querySelectorAll('[data-role="result"][data-index="0"] .math-block').length === 4 && document.querySelectorAll('[data-role="result"][data-index="1"] .math-block').length === 1`);
  await pressFirst('[data-role="sourceA"][data-index="1"] .math-block, [data-role="sourceB"][data-index="1"] .math-block', 2);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 34')`);
  assert(await evaluate(`document.querySelector('#verticalFormula').textContent.includes('3') && document.querySelector('#verticalFormula').textContent.includes('4')`), "Addition working did not complete.");

  await evaluate(`document.querySelector('[data-operation="subtraction"]').click()`);
  await setNumbers("32", "9");
  await drag('[data-role="minuend"][data-index="1"] .math-block', '[data-role="minuend"][data-index="0"]');
  await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block').length === 12`);
  await screenshot("redesign-borrow-done.png");
  assert(await evaluate(`document.querySelector('.formula-notes').textContent.includes('3→2') && document.querySelector('.formula-notes').textContent.includes('2→12')`), "Borrowing is not shown in the working.");
  await pressFirst('[data-role="minuend"][data-index="0"] .math-block', 9);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 23')`);
  assert(await evaluate(`document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block').length === 3`), "Subtraction blocks do not show 23.");

  await setNumbers("1000", "1");
  for (const from of [3, 2, 1]) {
    await drag(`[data-role="minuend"][data-index="${from}"] .math-block`, `[data-role="minuend"][data-index="${from - 1}"]`);
    await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="${from - 1}"] .math-block').length === 10`);
  }
  await pressFirst('[data-role="minuend"][data-index="0"] .math-block', 1);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 999')`);

  await evaluate(`document.querySelector('[data-operation="addition"]').click()`);
  await setNumbers("999", "1");
  for (let place = 0; place < 3; place += 1) {
    const amount = place === 0 ? 10 : 9;
    await pressFirst(`[data-role="sourceA"][data-index="${place}"] .math-block, [data-role="sourceB"][data-index="${place}"] .math-block`, amount);
    await waitFor(`document.querySelector('[data-role="result"][data-index="${place}"] .carry-bundle') !== null`);
    await drag(`[data-role="result"][data-index="${place}"] .carry-bundle`, `[data-role="result"][data-index="${place + 1}"]`);
    await waitFor(`document.querySelectorAll('[data-role="result"][data-index="${place + 1}"] .math-block').length === 1`);
  }
  await waitFor(`document.querySelector('#equation').textContent.includes('= 1000')`);

  await setNumbers("12345678901234567890", "10");
  assert(await evaluate(`document.querySelectorAll('#sourceAGrid .place-column').length === 20`), "Large user-entered numbers are still restricted.");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  await screenshot("redesign-mobile.png");
  const mobileOverflow = await evaluate(`({
    page: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    offenders: [...document.querySelectorAll('*')].filter(node => node.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
      .slice(0, 12).map(node => ({ tag: node.tagName, className: node.className, id: node.id, right: Math.round(node.getBoundingClientRect().right) }))
  })`);
  assert(mobileOverflow.page <= mobileOverflow.viewport, `Mobile layout overflows: ${JSON.stringify(mobileOverflow)}`);

  for (const [language, expected] of [["en", "Live vertical working"], ["bm", "Bentuk lazim langsung"], ["zh", "同步竖式"]]) {
    await evaluate(`document.querySelector('[data-lang="${language}"]').click()`);
    assert((await evaluate(`document.querySelector('[data-i18n="workingTitle"]').textContent`)) === expected, `Language ${language} did not update.`);
  }
  await setNumbers("28", "6");
  const fullMobile = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  await fs.writeFile(new URL("redesign-mobile-full.png", import.meta.url), Buffer.from(fullMobile.data, "base64"));
  assert(errors.length === 0, `Browser errors: ${errors.join("; ")}`);
  console.log("PASS: immediate drag, live vertical working, manual carry and borrow, unrestricted input, cascading borrow, languages, mobile layout.");
} finally {
  socket.close();
}
