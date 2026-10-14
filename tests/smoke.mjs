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
    bank: document.querySelectorAll('#bankGrid .math-block').length,
    firstEmpty: document.querySelectorAll('#sourceAGrid .math-block').length === 0,
    secondEmpty: document.querySelectorAll('#sourceBGrid .math-block').length === 0,
    noRange: !document.querySelector("#rangeSelect"),
    noExchangeButton: !document.querySelector("#exchangeBtn"),
    stepsVertical: document.querySelectorAll(".step-list li")[0].getBoundingClientRect().top < document.querySelectorAll(".step-list li")[1].getBoundingClientRect().top,
    imagesLoaded: [...document.images].every(image => image.complete && image.naturalWidth > 0),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  })`);
  assert(initial.equation.includes("28 + 6 = ?"), "The answer should start hidden.");
  assert(initial.bank === 2 && initial.firstEmpty && initial.secondEmpty, "Addition must start with empty A and B groups and a block supply.");
  assert(initial.formula.includes("?"), "The vertical working should be visible before the answer.");
  assert(initial.noRange && initial.noExchangeButton && initial.stepsVertical, "The old gated layout is still present.");
  assert(initial.imagesLoaded && !initial.overflow, "Initial assets or desktop layout failed.");
  await screenshot("redesign-desktop.png");

  await drag('[data-role="bank"][data-index="0"] .math-block', '[data-role="sourceA"][data-index="0"]');
  await waitFor(`document.querySelectorAll('[data-role="sourceA"][data-index="0"] .math-block').length === 1`);
  await pressFirst('[data-role="bank"][data-index="0"] .math-block', 13);
  await pressFirst('[data-role="bank"][data-index="1"] .math-block', 2);
  await waitFor(`document.querySelector('#blockBank').hidden && document.querySelectorAll('#sourceBGrid .math-block').length === 6`);
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
  assert(await evaluate(`document.querySelectorAll('#minuendGrid .math-block').length === 0 && document.querySelector('#takeAwayTarget').textContent === '9' && !document.querySelector('#removedProgress')`), "Subtraction must start empty with only the target number shown on the recycle bin.");
  await pressFirst('[data-role="bank"][data-index="0"] .math-block', 2);
  await pressFirst('[data-role="bank"][data-index="1"] .math-block', 3);
  await waitFor(`document.querySelector('#blockBank').hidden`);
  await drag('[data-role="minuend"][data-index="1"] .math-block', '[data-role="minuend"][data-index="0"]');
  await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block').length === 12`);
  await screenshot("redesign-borrow-done.png");
  assert(await evaluate(`document.querySelector('.formula-notes').textContent.includes('3→2') && document.querySelector('.formula-notes').textContent.includes('2→12')`), "Borrowing is not shown in the working.");
  await pressFirst('[data-role="minuend"][data-index="0"] .math-block', 9);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 23')`);
  assert(await evaluate(`document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block').length === 3`), "Subtraction blocks do not show 23.");
  await drag('[data-role="removed"][data-index="0"] .math-block', '[data-role="minuend"][data-index="0"]');
  await waitFor(`document.querySelector('#equation').textContent.includes('= ?') && document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block').length === 4`);
  await drag('[data-role="minuend"][data-index="0"] .math-block', '[data-role="removed"][data-index="0"]');
  await waitFor(`document.querySelector('#equation').textContent.includes('= 23')`);

  await setNumbers("1000", "1");
  await pressFirst('[data-role="bank"][data-index="3"] .math-block', 1);
  for (const from of [3, 2, 1]) {
    await drag(`[data-role="minuend"][data-index="${from}"] .math-block`, `[data-role="minuend"][data-index="${from - 1}"]`);
    await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="${from - 1}"] .math-block').length === 10`);
    if (from === 3) {
      assert(await evaluate(`(() => {
        const blocks = [...document.querySelectorAll('[data-role="minuend"][data-index="2"] .math-block')];
        const lefts = blocks.map(block => Math.round(block.getBoundingClientRect().left));
        const tops = blocks.map(block => Math.round(block.getBoundingClientRect().top));
        return blocks.length === 10 && new Set(lefts).size === 2 && new Set(tops).size === 5;
      })()`), "Ten hundred-blocks should form two columns and five rows.");
    }
  }
  await pressFirst('[data-role="minuend"][data-index="0"] .math-block', 1);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 999')`);
  assert(await evaluate(`(() => {
    const cells = [...document.querySelectorAll('.formula-answer .formula-cell')].map(cell => cell.textContent);
    return cells.join('') === '999' && cells[0] === '';
  })()`), "The vertical answer should omit its leading zero.");

  await setNumbers("1000", "99");
  await pressFirst('[data-role="bank"][data-index="3"] .math-block', 1);
  for (const from of [3, 2, 1]) {
    await drag(`[data-role="minuend"][data-index="${from}"] .math-block`, `[data-role="minuend"][data-index="${from - 1}"]`);
    await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="${from - 1}"] .math-block').length === 10`);
  }
  await pressFirst('[data-role="minuend"][data-index="0"] .math-block', 9);
  await pressFirst('[data-role="minuend"][data-index="1"] .math-block', 9);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 901')`);
  assert(await evaluate(`(() => {
    const cells = [...document.querySelectorAll('.formula-answer .formula-cell')].map(cell => cell.textContent);
    return cells.join('') === '901' && cells[0] === '' && cells[2] === '0';
  })()`), "The vertical answer should keep an internal zero while omitting its leading zero.");
  await evaluate(`document.querySelector('#subtractionBoard').scrollIntoView({ block: 'start' })`);
  await screenshot("qa-compact-hundreds.png");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  assert(await evaluate(`document.documentElement.scrollWidth <= document.documentElement.clientWidth`),
    "Four-place block grids should scroll inside their panel, not widen the mobile page.");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1050, deviceScaleFactor: 1, mobile: false });

  await setNumbers("500", "28");
  await pressFirst('[data-role="bank"][data-index="2"] .math-block', 5);
  await waitFor(`document.querySelector('#blockBank').hidden`);
  await drag('[data-role="minuend"][data-index="2"] .math-block', '[data-role="minuend"][data-index="1"]');
  await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="1"] .math-block').length === 10`);
  await drag('[data-role="minuend"][data-index="1"] .math-block', '[data-role="minuend"][data-index="0"]');
  await waitFor(`document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block').length === 10`);
  const fivePerRow = await evaluate(`(() => {
    const blocks = [...document.querySelectorAll('[data-role="minuend"][data-index="0"] .math-block')];
    const tops = blocks.map(block => Math.round(block.getBoundingClientRect().top));
    return tops.length === 10 && tops.slice(0, 5).every(top => top === tops[0]) && tops[5] > tops[0] && tops.slice(5).every(top => top === tops[5]);
  })()`);
  assert(fivePerRow, "Ones must be arranged five per row.");
  await pressFirst('[data-role="minuend"][data-index="0"] .math-block', 8);
  await pressFirst('[data-role="minuend"][data-index="1"] .math-block', 2);
  await waitFor(`document.querySelector('#equation').textContent.includes('= 472')`);
  assert(await evaluate(`document.querySelector('#takeAwayTarget').textContent === '28' && document.querySelector('#subValueA').textContent.includes('从 500 开始') && !document.querySelector('#subtractionBoard').textContent.includes('10 / 10')`), "The subtraction target or regrouping label is misleading.");
  await screenshot("redesign-subtraction-500-28.png");

  await evaluate(`document.querySelector('[data-operation="addition"]').click()`);
  await setNumbers("999", "1");
  await pressFirst('[data-role="bank"][data-index="0"] .math-block', 10);
  await pressFirst('[data-role="bank"][data-index="1"] .math-block', 9);
  await pressFirst('[data-role="bank"][data-index="2"] .math-block', 9);
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
  await pressFirst('[data-role="bank"][data-index="0"] .math-block', 14);
  await pressFirst('[data-role="bank"][data-index="1"] .math-block', 2);
  await waitFor(`document.querySelector('#blockBank').hidden`);
  assert(await evaluate(`(() => {
    const blocks = [...document.querySelectorAll('[data-role="sourceA"][data-index="0"] .math-block')];
    const tops = blocks.map(block => Math.round(block.getBoundingClientRect().top));
    return tops.length === 8 && tops.slice(0, 5).every(top => top === tops[0]) && tops.slice(5).every(top => top > tops[0]) && document.documentElement.scrollWidth <= document.documentElement.clientWidth;
  })()`), "Mobile ones do not show five per row without page overflow.");
  const assembledMobile = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  await fs.writeFile(new URL("redesign-mobile-assembled.png", import.meta.url), Buffer.from(assembledMobile.data, "base64"));
  assert(errors.length === 0, `Browser errors: ${errors.join("; ")}`);
  console.log("PASS: empty starting boards, block supply, live working, manual carry and borrow, reversible recycle bin, unrestricted input, languages, mobile layout.");
} finally {
  socket.close();
}
