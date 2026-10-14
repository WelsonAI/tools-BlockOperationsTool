(() => {
  "use strict";

  const copy = {
    zh: {
      title: "一起来探索积木加减！", subtitle: "自己移动位值积木，看见进位和借位。",
      addition: "加法", subtraction: "减法", teacherSetup: "数字设置", manualNumbers: "自己输入数字",
      firstNumber: "第一个数", secondNumber: "第二个数", build: "更换数字", reset: "重置工具",
      sourceScopeTitle: "自由操作位值积木", noRandom: "数字由你输入，没有随机题目或固定范围。",
      handsOn: "动手试试！", currentOperation: "现在操作", freeNumbers: "自由数字",
      groupA: "第一组", groupB: "第二组", combineArea: "合并区", startAmount: "正在操作的积木", startingFrom: value => `从 ${value} 开始`,
      bankTitle: "积木库", bankHint: "先从这里拖积木，自己摆出题目的数字。",
      takeAwayTray: "回收桶 · 要减", workingTitle: "同步竖式", stepMoveTitle: "先摆出数字",
      stepExchangeTitle: "自己移动与换位", stepFormulaTitle: "从上往下看竖式",
      oneBlock: "1 个位", tenBlock: "1 个十位 = 10 个个位",
      hundredBlock: "1 个百位 = 10 个十位", thousandBlock: "1 个千位 = 10 个百位",
      placeNames: ["个位", "十位", "百位", "千位"], higherPlace: power => `10^${power} 位`,
      additionTitle: "积木加法实验室", subtractionTitle: "积木减法实验室",
      scopeAddition: "输入你要演示的数字；学生自己拖动积木，并把每 10 个同位积木进位。",
      scopeSubtraction: "输入你要演示的数字；学生自己拖走积木，不够时把高一位拆成 10 个。",
      heroAdd: "先从积木库摆出两组数字，再拖入合并区；满 10 个时自己进位。",
      heroSub: "先从积木库摆出原有数字，再把要减掉的积木拖进回收桶；不够时自己借位。",
      readyAdd: "A、B 两组还是空的。先从积木库摆出题目的两个数。",
      readySub: "原有积木区还是空的。先从积木库摆出第一个数。",
      buildProgress: count => `已摆入 ${count} 块积木；对照上面的数字继续摆。`,
      buildReady: "数字已摆好，可以开始移动积木。",
      buildDone: "摆对了！现在开始运算。", returnDone: "已把积木放回积木库。", undoDone: "已从回收桶放回原来的位值栏。",
      moveProgress: done => `已移到合并区 ${done} 块。`,
      removeProgress: () => "按位值把积木放进回收桶；放错可拖回原位。",
      exchangeIdle: "需要时，由你自己拖动积木换位。",
      carryReady: (from, to) => `把 10 个${from}拖到${to}，合成 1 块。`,
      borrowReady: (from, to) => `把 1 个${from}拖到${to}，拆成 10 块。`,
      exchangeCount: count => `你已完成 ${count} 次进位／借位。`,
      formulaProgress: () => "右边竖式会随着操作逐位填写。",
      formulaDone: "竖式已完成；结果由你摆出的积木得到。",
      carryToken: (from, to) => `拖这 10 个${from}到${to}`,
      carryDone: (from, to) => `你把 10 个${from}合成了 1 个${to}。`,
      borrowDone: (from, to) => `你把 1 个${from}拆成了 10 个${to}。`,
      moveDone: "积木已放好，竖式正在更新。", complete: value => `完成！结果是 ${value}。`,
      invalidNumber: "请输入完整的非负整数（只用 0–9）。",
      invalidOrder: "减法的第一个数要大于或等于第二个数。",
      wrongDrop: "请把积木放到对应的位值栏；借位要往低一位拖。",
      unavailable: "这一步还不需要这样换位。"
    },
    en: {
      title: "Explore Addition and Subtraction with Blocks!", subtitle: "Move place-value blocks yourself to see carrying and borrowing.",
      addition: "Addition", subtraction: "Subtraction", teacherSetup: "Number setup", manualNumbers: "Enter your own numbers",
      firstNumber: "First number", secondNumber: "Second number", build: "Change numbers", reset: "Reset tool",
      sourceScopeTitle: "Explore place-value blocks freely", noRandom: "You choose the numbers. There are no random questions or preset ranges.",
      handsOn: "Try it!", currentOperation: "Current operation", freeNumbers: "Open numbers",
      groupA: "First group", groupB: "Second group", combineArea: "Combine area", startAmount: "Working blocks", startingFrom: value => `Started with ${value}`,
      bankTitle: "Block supply", bankHint: "Drag blocks from here to build the numbers yourself.",
      takeAwayTray: "Recycle bin · take away", workingTitle: "Live vertical working", stepMoveTitle: "Build the numbers",
      stepExchangeTitle: "Move and regroup yourself", stepFormulaTitle: "Read the working top to bottom",
      oneBlock: "1 one", tenBlock: "1 ten = 10 ones", hundredBlock: "1 hundred = 10 tens",
      thousandBlock: "1 thousand = 10 hundreds", placeNames: ["ones", "tens", "hundreds", "thousands"],
      higherPlace: power => `10^${power} place`, additionTitle: "Block Addition Lab", subtractionTitle: "Block Subtraction Lab",
      scopeAddition: "Enter numbers to demonstrate. Pupils move the blocks and carry each group of 10 themselves.",
      scopeSubtraction: "Enter numbers to demonstrate. Pupils take blocks away and split a higher block when needed.",
      heroAdd: "Build both numbers from the block supply, then combine them. Carry each group of 10 yourself.",
      heroSub: "Build the starting number from the block supply, then drag blocks into the recycle bin. Borrow yourself when needed.",
      readyAdd: "Both groups are empty. Build the two numbers from the block supply first.",
      readySub: "The starting area is empty. Build the first number from the block supply.",
      buildProgress: count => `${count} blocks placed. Keep checking the numbers above.`,
      buildReady: "The numbers are built. You can start moving blocks.",
      buildDone: "Built correctly! Now work out the operation.", returnDone: "Block returned to the supply.", undoDone: "Block returned from the recycle bin to its place.",
      moveProgress: done => `${done} blocks moved to the combine area.`,
      removeProgress: () => "Move blocks by place value into the recycle bin. Drag mistakes back.",
      exchangeIdle: "When needed, drag the blocks to regroup them yourself.",
      carryReady: (from, to) => `Drag 10 ${from} to ${to} to make one block.`,
      borrowReady: (from, to) => `Drag one ${from} to ${to} to split it into 10.`,
      exchangeCount: count => `You have regrouped ${count} time${count === 1 ? "" : "s"}.`,
      formulaProgress: () => "The vertical working fills as you move the blocks.",
      formulaDone: "The vertical working is complete and matches your blocks.",
      carryToken: (from, to) => `Drag these 10 ${from} to ${to}`,
      carryDone: (from, to) => `You made 1 ${to} from 10 ${from}.`,
      borrowDone: (from, to) => `You split 1 ${from} into 10 ${to}.`,
      moveDone: "Block placed. The working has updated.", complete: value => `Complete! The result is ${value}.`,
      invalidNumber: "Enter complete non-negative whole numbers using digits 0–9.",
      invalidOrder: "The first number must be at least the second for subtraction.",
      wrongDrop: "Drop into the matching place. Borrow by moving a block one place lower.",
      unavailable: "That exchange is not needed yet."
    },
    bm: {
      title: "Mari Teroka Tambah dan Tolak dengan Blok!", subtitle: "Gerakkan blok nilai tempat sendiri untuk melihat pengumpulan semula.",
      addition: "Tambah", subtraction: "Tolak", teacherSetup: "Tetapan nombor", manualNumbers: "Masukkan nombor sendiri",
      firstNumber: "Nombor pertama", secondNumber: "Nombor kedua", build: "Tukar nombor", reset: "Set semula alat",
      sourceScopeTitle: "Teroka blok nilai tempat dengan bebas", noRandom: "Anda pilih nombor. Tiada soalan rawak atau julat tetap.",
      handsOn: "Mari cuba!", currentOperation: "Operasi sekarang", freeNumbers: "Nombor bebas",
      groupA: "Kumpulan pertama", groupB: "Kumpulan kedua", combineArea: "Ruang gabung", startAmount: "Blok yang sedang digunakan", startingFrom: value => `Bermula dengan ${value}`,
      bankTitle: "Bekalan blok", bankHint: "Seret blok dari sini untuk bina nombor sendiri.",
      takeAwayTray: "Tong kitar semula · tolak", workingTitle: "Bentuk lazim langsung", stepMoveTitle: "Bina nombor dahulu",
      stepExchangeTitle: "Gerak dan kumpul semula sendiri", stepFormulaTitle: "Baca dari atas ke bawah",
      oneBlock: "1 sa", tenBlock: "1 puluh = 10 sa", hundredBlock: "1 ratus = 10 puluh",
      thousandBlock: "1 ribu = 10 ratus", placeNames: ["sa", "puluh", "ratus", "ribu"],
      higherPlace: power => `nilai 10^${power}`, additionTitle: "Makmal Tambah Blok", subtractionTitle: "Makmal Tolak Blok",
      scopeAddition: "Masukkan nombor sendiri. Murid menggerakkan blok dan mengumpul setiap 10 blok sendiri.",
      scopeSubtraction: "Masukkan nombor sendiri. Murid menolak blok dan memecahkan blok nilai lebih tinggi apabila perlu.",
      heroAdd: "Bina kedua-dua nombor daripada bekalan blok, kemudian gabungkan. Kumpul semula setiap 10 blok sendiri.",
      heroSub: "Bina nombor asal daripada bekalan blok, kemudian seret blok yang ditolak ke tong kitar semula. Pinjam sendiri jika perlu.",
      readyAdd: "Kedua-dua kumpulan masih kosong. Bina nombor daripada bekalan blok dahulu.",
      readySub: "Ruang blok asal masih kosong. Bina nombor pertama daripada bekalan blok.",
      buildProgress: count => `${count} blok telah disusun. Semak nombor di atas dan teruskan.`,
      buildReady: "Nombor sudah dibina. Sekarang gerakkan blok.",
      buildDone: "Betul! Sekarang mulakan operasi.", returnDone: "Blok dikembalikan ke bekalan.", undoDone: "Blok dipulangkan dari tong kitar semula ke tempat asal.",
      moveProgress: done => `${done} blok dipindah ke ruang gabung.`,
      removeProgress: () => "Seret blok mengikut nilai tempat ke tong kitar semula. Kesilapan boleh dipulangkan.",
      exchangeIdle: "Apabila perlu, seret blok untuk mengumpul semula sendiri.",
      carryReady: (from, to) => `Seret 10 ${from} ke ${to} untuk membuat satu blok.`,
      borrowReady: (from, to) => `Seret satu ${from} ke ${to} untuk memecahkannya menjadi 10.`,
      exchangeCount: count => `Anda sudah mengumpul semula ${count} kali.`,
      formulaProgress: () => "Bentuk lazim terisi apabila blok digerakkan.",
      formulaDone: "Bentuk lazim lengkap dan sepadan dengan blok anda.",
      carryToken: (from, to) => `Seret 10 ${from} ini ke ${to}`,
      carryDone: (from, to) => `Anda membina 1 ${to} daripada 10 ${from}.`,
      borrowDone: (from, to) => `Anda memecahkan 1 ${from} kepada 10 ${to}.`,
      moveDone: "Blok sudah diletakkan. Bentuk lazim dikemas kini.", complete: value => `Selesai! Hasilnya ${value}.`,
      invalidNumber: "Masukkan nombor bulat bukan negatif dengan digit 0–9 sahaja.",
      invalidOrder: "Nombor pertama mesti sekurang-kurangnya sama dengan nombor kedua untuk tolak.",
      wrongDrop: "Letakkan pada nilai tempat yang sepadan. Pinjam dengan menggerakkan blok satu tempat ke kanan.",
      unavailable: "Pengumpulan semula itu belum diperlukan."
    }
  };

  const el = {
    numberA: document.getElementById("numberA"), numberB: document.getElementById("numberB"),
    inputError: document.getElementById("inputError"), buildBtn: document.getElementById("buildBtn"),
    resetBtn: document.getElementById("resetBtn"), scopeText: document.getElementById("scopeText"),
    activityTitle: document.getElementById("activityTitle"), equation: document.getElementById("equation"),
    heroHint: document.getElementById("heroHint"), additionBoard: document.getElementById("additionBoard"),
    subtractionBoard: document.getElementById("subtractionBoard"), bank: document.getElementById("blockBank"),
    bankGrid: document.getElementById("bankGrid"), sourceAGrid: document.getElementById("sourceAGrid"),
    sourceBGrid: document.getElementById("sourceBGrid"), resultGrid: document.getElementById("resultGrid"),
    minuendGrid: document.getElementById("minuendGrid"), removedGrid: document.getElementById("removedGrid"),
    takeAwayTarget: document.getElementById("takeAwayTarget"),
    valueA: document.getElementById("valueA"), valueB: document.getElementById("valueB"),
    resultValue: document.getElementById("resultValue"), subValueA: document.getElementById("subValueA"),
    feedback: document.getElementById("feedback"),
    verticalFormula: document.getElementById("verticalFormula"), stepMoveText: document.getElementById("stepMoveText"),
    stepExchangeText: document.getElementById("stepExchangeText"), stepFormulaText: document.getElementById("stepFormulaText")
  };

  const state = {
    lang: "zh", operation: "addition", a: 28n, b: 6n, size: 2,
    built: false, assembled: false, complete: false, busy: false,
    sourceA: [], sourceB: [], result: [], remaining: [], removed: [], target: [], targetA: [],
    carryInto: [], borrowFrom: [], borrowInto: [], exchanges: 0
  };

  const tr = () => copy[state.lang];
  const sign = () => state.operation === "addition" ? "+" : "−";
  const answer = () => state.operation === "addition" ? state.a + state.b : state.a - state.b;
  const placeName = index => tr().placeNames[index] || tr().higherPlace(index);
  const shortPlace = index => index < 4 ? placeName(index) : `10^${index}`;
  const digitArray = (value, size) => Array.from({ length: size }, (_, index) => Number(value / 10n ** BigInt(index) % 10n));
  const total = values => values.reduce((sum, value) => sum + value, 0);
  const zeroes = () => Array(state.size).fill(0);

  function applyLanguage(language) {
    state.lang = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : language === "bm" ? "ms" : "en";
    document.querySelectorAll("[data-lang]").forEach(button => button.classList.toggle("active", button.dataset.lang === language));
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const value = tr()[node.dataset.i18n];
      if (typeof value === "string") node.textContent = value;
    });
    if (state.built) render();
  }

  function createGrid(container, role) {
    container.replaceChildren();
    container.classList.toggle("stack-places", state.size <= 3);
    container.style.setProperty("--place-count", state.size);
    const hasFiveWideOnes = role !== "bank";
    container.style.minWidth = `${Math.max(role === "bank" ? 192 : 280, (state.size - 1) * 96 + (hasFiveWideOnes ? 260 : 96))}px`;
    container.style.gridTemplateColumns = Array.from({ length: state.size }, (_, position) =>
      hasFiveWideOnes && position === state.size - 1 ? "minmax(260px, 1fr)" : "minmax(96px, 1fr)").join(" ");
    for (let index = state.size - 1; index >= 0; index -= 1) {
      const column = document.createElement("div");
      column.className = "place-column";
      column.dataset.index = String(index);
      const label = document.createElement("div");
      label.className = "place-label";
      label.dataset.placeLabel = String(index);
      label.textContent = shortPlace(index);
      const zone = document.createElement("div");
      zone.className = "block-zone drop-zone";
      zone.dataset.role = role;
      zone.dataset.index = String(index);
      zone.setAttribute("aria-label", `${placeName(index)} · ${role}`);
      column.append(label, zone);
      container.append(column);
    }
  }

  function zoneFor(role, index) {
    return document.querySelector(`.block-zone[data-role="${role}"][data-index="${index}"]`);
  }

  function createBlock(index, origin) {
    const asset = ["one", "ten", "hundred", "thousand"][index];
    const block = document.createElement(asset ? "img" : "div");
    if (asset) block.src = `assets/${asset}.png`;
    else block.textContent = `10^${index}`;
    block.className = `math-block ${asset ? `block-${asset}` : "block-large"}`;
    block.alt = placeName(index);
    block.setAttribute("role", "button");
    block.setAttribute("aria-label", placeName(index));
    block.draggable = false;
    block.tabIndex = 0;
    block.dataset.kind = "block";
    block.dataset.index = String(index);
    block.dataset.origin = origin;
    block.addEventListener("pointerdown", beginDrag);
    block.addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && canDrag(block)) {
        event.preventDefault();
        tapAction(block);
      }
    });
    return block;
  }

  function createCarryBundle(index) {
    const bundle = document.createElement("button");
    bundle.type = "button";
    bundle.className = "carry-bundle";
    bundle.dataset.kind = "carry";
    bundle.dataset.index = String(index);
    bundle.draggable = false;
    bundle.textContent = `10 × ${index < 4 ? ["1", "10", "100", "1000"][index] : `10^${index}`} →`;
    bundle.title = tr().carryToken(placeName(index), placeName(index + 1));
    bundle.setAttribute("aria-label", bundle.title);
    bundle.addEventListener("pointerdown", beginDrag);
    bundle.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        void carry(index);
      }
    });
    return bundle;
  }

  function renderGrid(role, counts) {
    counts.forEach((count, index) => {
      const zone = zoneFor(role, index);
      if (!zone) return;
      zone.replaceChildren();
      for (let item = 0; item < count; item += 1) zone.append(createBlock(index, role));
      if (role === "result" && count >= 10 && index + 1 < state.size) zone.prepend(createCarryBundle(index));
    });
  }

  function parseInput() {
    const first = el.numberA.value.trim();
    const second = el.numberB.value.trim();
    if (!/^\d+$/.test(first) || !/^\d+$/.test(second)) return { error: tr().invalidNumber };
    const a = BigInt(first);
    const b = BigInt(second);
    if (state.operation === "subtraction" && a < b) return { error: tr().invalidOrder };
    return { a, b };
  }

  function buildOperation() {
    const values = parseInput();
    if (values.error) {
      el.inputError.textContent = values.error;
      el.inputError.hidden = false;
      state.built = false;
      el.additionBoard.hidden = true;
      el.subtractionBoard.hidden = true;
      el.verticalFormula.replaceChildren();
      showFeedback(values.error, "warning");
      return;
    }
    el.inputError.hidden = true;
    state.a = values.a;
    state.b = values.b;
    const result = state.operation === "addition" ? values.a + values.b : values.a - values.b;
    state.size = Math.max(1, values.a.toString().length, values.b.toString().length, result.toString().length);
    state.targetA = digitArray(values.a, state.size);
    state.sourceA = zeroes();
    state.sourceB = zeroes();
    state.result = zeroes();
    state.remaining = zeroes();
    state.removed = zeroes();
    state.target = digitArray(values.b, state.size);
    state.carryInto = zeroes();
    state.borrowFrom = zeroes();
    state.borrowInto = zeroes();
    state.exchanges = 0;
    state.complete = false;
    state.busy = false;
    state.built = true;
    state.assembled = assemblyReady();

    [
      [el.bankGrid, "bank"],
      [el.sourceAGrid, "sourceA"], [el.sourceBGrid, "sourceB"], [el.resultGrid, "result"],
      [el.minuendGrid, "minuend"], [el.removedGrid, "removed"]
    ].forEach(([container, role]) => createGrid(container, role));
    el.additionBoard.hidden = state.operation !== "addition";
    el.subtractionBoard.hidden = state.operation !== "subtraction";
    checkComplete();
    render();
    requestAnimationFrame(() => {
      document.querySelectorAll(".number-panel, .block-bank").forEach(panel => { panel.scrollLeft = panel.scrollWidth; });
      el.verticalFormula.scrollLeft = el.verticalFormula.scrollWidth;
    });
    showFeedback(state.complete ? tr().complete(answer().toString()) : state.operation === "addition" ? tr().readyAdd : tr().readySub,
      state.complete ? "success" : "");
  }

  function assemblyReady() {
    if (state.operation === "addition") return state.sourceA.every((count, index) => count === state.targetA[index]) &&
      state.sourceB.every((count, index) => count === state.target[index]);
    return state.remaining.every((count, index) => count === state.targetA[index]);
  }

  function borrowSourceIndex() {
    if (state.operation !== "subtraction") return -1;
    for (let low = 0; low < state.size; low += 1) {
      const needed = state.target[low] - state.removed[low];
      if (needed <= state.remaining[low]) continue;
      for (let high = low + 1; high < state.size; high += 1) {
        if (state.remaining[high] > 0) return high;
      }
    }
    return -1;
  }

  function firstCarryIndex() {
    return state.result.findIndex((count, index) => count >= 10 && index + 1 < state.size);
  }

  function canDrag(token) {
    if (!state.built || state.busy) return false;
    const index = Number(token.dataset.index);
    const origin = token.dataset.origin;
    if (token.dataset.kind === "carry") return state.assembled && !state.complete && state.operation === "addition" && state.result[index] >= 10;
    if (origin === "bank") return !state.assembled && (state.operation === "addition" ?
      state.sourceA[index] < state.targetA[index] || state.sourceB[index] < state.target[index] :
      state.remaining[index] < state.targetA[index]);
    if (!state.assembled) return state.operation === "addition" ?
      (origin === "sourceA" && state.sourceA[index] > 0) || (origin === "sourceB" && state.sourceB[index] > 0) :
      origin === "minuend" && state.remaining[index] > 0;
    if (state.operation === "addition") return !state.complete && (origin === "sourceA" || origin === "sourceB");
    if (origin === "removed") return state.removed[index] > 0;
    if (state.complete) return false;
    return token.dataset.origin === "minuend" &&
      (state.removed[index] < state.target[index] || index === borrowSourceIndex());
  }

  function isValidDrop(token, target) {
    if (!target || !canDrag(token)) return false;
    const index = Number(token.dataset.index);
    const targetIndex = Number(target.dataset.index);
    if (token.dataset.kind === "carry") return target.dataset.role === "result" && targetIndex === index + 1;
    if (!state.assembled) {
      if (token.dataset.origin === "bank") return targetIndex === index && (state.operation === "addition" ?
        target.dataset.role === "sourceA" && state.sourceA[index] < state.targetA[index] ||
        target.dataset.role === "sourceB" && state.sourceB[index] < state.target[index] :
        target.dataset.role === "minuend" && state.remaining[index] < state.targetA[index]);
      return target.dataset.role === "bank" && targetIndex === index;
    }
    if (state.operation === "addition") return target.dataset.role === "result" && targetIndex === index;
    if (token.dataset.origin === "removed") return target.dataset.role === "minuend" && targetIndex === index;
    return (target.dataset.role === "removed" && targetIndex === index && state.removed[index] < state.target[index]) ||
      (target.dataset.role === "minuend" && targetIndex === index - 1 && index === borrowSourceIndex());
  }

  function beginDrag(event) {
    const token = event.currentTarget;
    if (!canDrag(token)) return;
    event.preventDefault();
    const rect = token.getBoundingClientRect();
    const ghost = token.cloneNode(true);
    ghost.className = `drag-ghost${token.dataset.kind === "carry" ? " ghost-bundle" : ""}`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.append(ghost);
    token.style.opacity = ".25";
    let moved = false;
    let frame = 0;
    let x = event.clientX;
    let y = event.clientY;
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
    const paint = () => {
      frame = 0;
      ghost.style.left = `${x - offsetX}px`;
      ghost.style.top = `${y - offsetY}px`;
    };
    const clearHighlight = () => document.querySelectorAll(".drop-ready").forEach(zone => zone.classList.remove("drop-ready"));
    const move = moveEvent => {
      if (moveEvent.pointerId !== event.pointerId) return;
      x = moveEvent.clientX;
      y = moveEvent.clientY;
      if (Math.hypot(x - event.clientX, y - event.clientY) > 5) moved = true;
      if (!frame) frame = requestAnimationFrame(paint);
      clearHighlight();
      const target = document.elementFromPoint(x, y)?.closest(".drop-zone");
      if (isValidDrop(token, target)) target.classList.add("drop-ready");
    };
    const cleanUp = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", cancel);
      if (frame) cancelAnimationFrame(frame);
      clearHighlight();
      ghost.remove();
      token.style.opacity = "";
    };
    const end = endEvent => {
      if (endEvent.pointerId !== event.pointerId) return;
      const target = document.elementFromPoint(endEvent.clientX, endEvent.clientY)?.closest(".drop-zone");
      cleanUp();
      if (!moved) tapAction(token);
      else if (isValidDrop(token, target)) performDrop(token, target);
      else showFeedback(tr().wrongDrop, "warning");
    };
    const cancel = () => cleanUp();
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", cancel);
  }

  function tapAction(token) {
    if (!canDrag(token)) return;
    const index = Number(token.dataset.index);
    if (token.dataset.kind === "carry") { void carry(index); return; }
    if (!state.assembled) {
      if (token.dataset.origin === "bank") {
        const role = state.operation === "subtraction" ? "minuend" :
          state.sourceA[index] < state.targetA[index] ? "sourceA" : "sourceB";
        placeFromBank(role, index);
      } else returnToBank(token.dataset.origin, index);
      return;
    }
    if (state.operation === "addition") { moveUnit(token.dataset.origin, index); return; }
    if (token.dataset.origin === "removed") { undoRemoval(index); return; }
    if (state.removed[index] < state.target[index]) moveUnit("minuend", index);
    else if (index === borrowSourceIndex()) void borrow(index);
  }

  function performDrop(token, target) {
    const index = Number(token.dataset.index);
    if (token.dataset.kind === "carry") { void carry(index); return; }
    if (!state.assembled) {
      if (token.dataset.origin === "bank") placeFromBank(target.dataset.role, index);
      else returnToBank(token.dataset.origin, index);
      return;
    }
    if (token.dataset.origin === "removed") { undoRemoval(index); return; }
    if (state.operation === "addition" || target.dataset.role === "removed") moveUnit(token.dataset.origin, index);
    else void borrow(index);
  }

  function placeFromBank(role, index) {
    const collection = role === "minuend" ? state.remaining : state[role];
    const limit = role === "sourceB" ? state.target[index] : state.targetA[index];
    if (state.assembled || !collection || collection[index] >= limit) return;
    collection[index] += 1;
    state.assembled = assemblyReady();
    checkComplete();
    render();
    showFeedback(state.complete ? tr().complete(answer().toString()) : state.assembled ? tr().buildDone : tr().buildProgress(assemblyCount()),
      state.assembled ? "success" : "");
  }

  function returnToBank(role, index) {
    const collection = role === "minuend" ? state.remaining : state[role];
    if (state.assembled || !collection || collection[index] <= 0) return;
    collection[index] -= 1;
    render();
    showFeedback(tr().returnDone);
  }

  function undoRemoval(index) {
    if (state.operation !== "subtraction" || !state.assembled || state.removed[index] <= 0) return;
    state.removed[index] -= 1;
    state.remaining[index] += 1;
    checkComplete();
    render();
    showFeedback(tr().undoDone);
  }

  function assemblyCount() {
    return state.operation === "addition" ? total(state.sourceA) + total(state.sourceB) : total(state.remaining);
  }

  function moveUnit(origin, index) {
    if (state.complete || state.busy) return;
    if (state.operation === "addition") {
      state[origin][index] -= 1;
      state.result[index] += 1;
    } else {
      state.remaining[index] -= 1;
      state.removed[index] += 1;
    }
    checkComplete();
    render();
    showFeedback(state.complete ? tr().complete(answer().toString()) : tr().moveDone, state.complete ? "success" : "");
  }

  async function playAnimation(token, keyframes, options) {
    if (!token || !token.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { await token.animate(keyframes, options).finished; } catch { /* A reset may cancel the animation. */ }
  }

  async function carry(index) {
    if (!canDrag({ dataset: { kind: "carry", index: String(index) } })) return;
    state.busy = true;
    const from = zoneFor("result", index);
    const to = zoneFor("result", index + 1);
    const blocks = [...from.querySelectorAll(".math-block")].slice(0, 10);
    const destination = to.getBoundingClientRect();
    await Promise.all(blocks.map((block, order) => {
      const rect = block.getBoundingClientRect();
      return playAnimation(block, [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${destination.left + destination.width / 2 - rect.left - rect.width / 2}px, ${destination.top + destination.height / 2 - rect.top - rect.height / 2}px) scale(.15)`, opacity: .1 }
      ], { duration: 430, delay: order * 15, easing: "ease-in", fill: "forwards" });
    }));
    state.result[index] -= 10;
    state.result[index + 1] += 1;
    state.carryInto[index + 1] += 1;
    state.exchanges += 1;
    state.busy = false;
    checkComplete();
    render();
    showFeedback(state.complete ? tr().complete(answer().toString()) : tr().carryDone(placeName(index), placeName(index + 1)), "success");
  }

  async function borrow(index) {
    if (state.complete || state.busy || index !== borrowSourceIndex()) {
      showFeedback(tr().unavailable, "warning");
      return;
    }
    state.busy = true;
    const from = zoneFor("minuend", index);
    const to = zoneFor("minuend", index - 1);
    const block = from.querySelector(".math-block");
    const before = block.getBoundingClientRect();
    const after = to.getBoundingClientRect();
    await playAnimation(block, [
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${after.left + after.width / 2 - before.left - before.width / 2}px, ${after.top + after.height / 2 - before.top - before.height / 2}px) scale(.22)`, opacity: .1 }
    ], { duration: 560, easing: "ease-in", fill: "forwards" });
    state.remaining[index] -= 1;
    state.remaining[index - 1] += 10;
    state.borrowFrom[index] += 1;
    state.borrowInto[index - 1] += 10;
    state.exchanges += 1;
    state.busy = false;
    render();
    showFeedback(tr().borrowDone(placeName(index), placeName(index - 1)), "success");
  }

  function checkComplete() {
    if (!state.assembled) { state.complete = false; return; }
    if (state.operation === "addition") {
      state.complete = state.sourceA.every(count => count === 0) && state.sourceB.every(count => count === 0) &&
        state.result.every(count => count < 10);
    } else {
      state.complete = state.removed.every((count, index) => count === state.target[index]) &&
        state.remaining.every(count => count < 10);
    }
  }

  function isPlaceResolved(index) {
    if (!state.assembled) return false;
    for (let place = 0; place <= index; place += 1) {
      if (state.operation === "addition") {
        if (state.sourceA[place] || state.sourceB[place] || state.result[place] >= 10) return false;
      } else if (state.removed[place] !== state.target[place]) return false;
    }
    return (state.operation === "addition" ? state.result[index] : state.remaining[index]) < 10;
  }

  function renderFormula() {
    const board = document.createElement("div");
    board.className = "formula-grid";
    board.style.setProperty("--formula-places", state.size);
    const row = (className, lead, values) => {
      const line = document.createElement("div");
      line.className = `formula-row ${className}`;
      const operator = document.createElement("span");
      operator.className = "formula-operator";
      operator.textContent = lead;
      line.append(operator);
      for (let index = state.size - 1; index >= 0; index -= 1) {
        const cell = document.createElement("span");
        cell.className = "formula-cell";
        cell.textContent = values[index] ?? "";
        line.append(cell);
      }
      return line;
    };
    const aDigits = digitArray(state.a, state.size);
    const bDigits = digitArray(state.b, state.size);
    const originalA = state.a.toString().length;
    const originalB = state.b.toString().length;
    board.append(row("formula-places", "", Array.from({ length: state.size }, (_, i) => shortPlace(i))));
    board.append(row("formula-notes", "", Array.from({ length: state.size }, (_, i) => {
      if (state.operation === "addition") return state.carryInto[i] ? `+${state.carryInto[i]}` : "";
      if (state.borrowFrom[i] || state.borrowInto[i]) {
        return `${aDigits[i]}→${aDigits[i] + state.borrowInto[i] - state.borrowFrom[i]}`;
      }
      return "";
    })));
    board.append(row("formula-number", "", aDigits.map((digit, i) => i < originalA ? String(digit) : "")));
    board.append(row("formula-number formula-second", sign(), bDigits.map((digit, i) => i < originalB ? String(digit) : "")));
    board.append(row("formula-answer", "=", Array.from({ length: state.size }, (_, i) => isPlaceResolved(i) ?
      String(state.operation === "addition" ? state.result[i] : state.remaining[i]) : "?")));
    el.verticalFormula.replaceChildren(board);
  }

  function renderSteps() {
    const moved = state.operation === "addition" ?
      total(digitArray(state.a, state.size)) + total(digitArray(state.b, state.size)) - total(state.sourceA) - total(state.sourceB) :
      total(state.removed);
    el.stepMoveText.textContent = state.assembled ? tr().buildReady : tr().buildProgress(assemblyCount());
    const carryIndex = firstCarryIndex();
    const borrowIndex = borrowSourceIndex();
    if (!state.assembled) {
      el.stepExchangeText.textContent = tr().exchangeIdle;
    } else if (state.operation === "addition" && carryIndex >= 0) {
      el.stepExchangeText.textContent = tr().carryReady(placeName(carryIndex), placeName(carryIndex + 1));
    } else if (state.operation === "subtraction" && borrowIndex >= 0) {
      el.stepExchangeText.textContent = tr().borrowReady(placeName(borrowIndex), placeName(borrowIndex - 1));
    } else {
      el.stepExchangeText.textContent = state.operation === "addition" ? tr().moveProgress(moved) : tr().removeProgress(moved);
    }
    const resolved = Array.from({ length: state.size }, (_, i) => isPlaceResolved(i)).filter(Boolean).length;
    el.stepFormulaText.textContent = state.complete ? tr().formulaDone : tr().formulaProgress(resolved, state.size);
    document.querySelectorAll(".step-list li").forEach(item => {
      const step = Number(item.dataset.step);
      item.classList.toggle("active", !state.complete && (step === 1 && !state.assembled || step === 2 && state.assembled));
      item.classList.toggle("done", step === 1 && state.assembled || step === 2 && state.complete || step === 3 && state.complete);
    });
  }

  function render() {
    if (!state.built) return;
    const addition = state.operation === "addition";
    el.activityTitle.textContent = addition ? tr().additionTitle : tr().subtractionTitle;
    el.scopeText.textContent = addition ? tr().scopeAddition : tr().scopeSubtraction;
    el.heroHint.textContent = addition ? tr().heroAdd : tr().heroSub;
    el.equation.textContent = `${state.a} ${sign()} ${state.b} = ${state.complete ? answer() : "?"}`;
    el.valueA.textContent = state.a;
    el.valueB.textContent = state.b;
    el.resultValue.textContent = state.complete ? answer() : "?";
    el.subValueA.textContent = tr().startingFrom(state.a);
    el.takeAwayTarget.textContent = state.b.toString();
    el.bank.hidden = state.assembled;
    document.querySelectorAll("[data-place-label]").forEach(label => { label.textContent = shortPlace(Number(label.dataset.placeLabel)); });
    renderGrid("bank", Array(state.size).fill(1));
    if (addition) {
      renderGrid("sourceA", state.sourceA);
      renderGrid("sourceB", state.sourceB);
      renderGrid("result", state.result);
    } else {
      renderGrid("minuend", state.remaining);
      renderGrid("removed", state.removed);
    }
    renderFormula();
    renderSteps();
  }

  function showFeedback(message, kind = "") {
    el.feedback.textContent = message;
    el.feedback.className = `feedback${kind ? ` ${kind}` : ""}`;
  }

  function switchOperation(operation) {
    if (state.busy) return;
    state.operation = operation;
    document.querySelectorAll("[data-operation]").forEach(button => button.classList.toggle("active", button.dataset.operation === operation));
    buildOperation();
  }

  document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  document.querySelectorAll("[data-operation]").forEach(button => button.addEventListener("click", () => switchOperation(button.dataset.operation)));
  [el.numberA, el.numberB].forEach(input => input.addEventListener("keydown", event => {
    if (event.key === "Enter") buildOperation();
  }));
  el.buildBtn.addEventListener("click", buildOperation);
  el.resetBtn.addEventListener("click", () => {
    if (state.busy) return;
    el.numberA.value = state.operation === "addition" ? "28" : "32";
    el.numberB.value = state.operation === "addition" ? "6" : "9";
    buildOperation();
  });

  let syncingScroll = false;
  document.querySelectorAll(".number-panel, .block-bank").forEach(panel => panel.addEventListener("scroll", () => {
    if (syncingScroll) return;
    syncingScroll = true;
    const travel = Math.max(1, panel.scrollWidth - panel.clientWidth);
    const fraction = panel.scrollLeft / travel;
    document.querySelectorAll(".number-panel, .block-bank").forEach(other => {
      if (other !== panel) other.scrollLeft = fraction * Math.max(0, other.scrollWidth - other.clientWidth);
    });
    el.verticalFormula.scrollLeft = fraction * Math.max(0, el.verticalFormula.scrollWidth - el.verticalFormula.clientWidth);
    syncingScroll = false;
  }));

  applyLanguage("zh");
  buildOperation();
})();
