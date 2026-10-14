(() => {
  "use strict";

  const places = ["one", "ten", "hundred"];
  const placeValues = { one: 1, ten: 10, hundred: 100 };
  const blockImages = { one: "assets/one.png", ten: "assets/ten.png", hundred: "assets/hundred.png" };

  const translations = {
    zh: {
      title: "一起来探索积木加减！",
      subtitle: "用位值积木看见加法、减法与换位。",
      addition: "加法",
      subtraction: "减法",
      teacherSetup: "老师设置",
      manualNumbers: "手动输入数字",
      range: "课本范围",
      within40: "40 以内",
      within100: "100 以内",
      within1000: "1000 以内（加法）",
      firstNumber: "第一个数",
      secondNumber: "第二个数",
      build: "摆出积木",
      reset: "重置工具",
      sourceScopeTitle: "本工具只做课本里的加减法",
      noRandom: "没有随机出题；数字由老师输入。",
      handsOn: "动手试试！",
      currentOperation: "现在操作",
      stepBuild: "摆出数字",
      stepOperate: "拖动与换位",
      stepExplain: "查看结果",
      groupA: "第一组",
      groupB: "第二组",
      combineArea: "合并区",
      startAmount: "原有积木",
      takeAwayTarget: "需要减去",
      takeAwayTray: "减去区",
      showFormula: "查看直式",
      oneBlock: "1 个位",
      tenBlock: "1 个十位 = 10 个个位",
      hundredBlock: "1 个百位 = 10 个十位",
      observe: "仔细观察",
      move: "移动积木",
      explain: "说明换位",
      afterBlocks: "完成积木操作后",
      formulaTitle: "用直式说明",
      ones: "个位",
      tens: "十位",
      hundreds: "百位",
      additionTitle: "积木加法实验室",
      subtractionTitle: "积木减法实验室",
      scopeAddition: "加法依照课本做到 40、100 和 1000 以内；操作包括不换位、个位进位及十位进位。",
      scopeSubtraction: "减法依照课本做到 40 和 100 以内；操作包括不换位及把 1 个十位拆成 10 个个位。",
      heroStartAdd: "把两组积木拖进合并区，从个位开始。",
      heroStartSub: "从原有积木中拖走指定数量，从个位开始。",
      readyTitle: "先摆出积木",
      readyText: "按“摆出积木”开始。",
      moveAddTitle: place => `先合并${place}`,
      moveAddText: place => `把两组的${place}积木拖到合并区。也可以轻触积木。`,
      moveSubTitle: place => `先减去${place}`,
      moveSubText: (count, place) => count ? `把 ${count} 个${place}积木拖到减去区。也可以轻触积木。` : `这一步不需要减去${place}。`,
      exchangeAdd: (from, to) => `演示：10 个${from} → 1 个${to}`,
      exchangeSub: (from, to) => `演示：1 个${from} → 10 个${to}`,
      exchangeAddDone: (from, to) => `10 个${from}已经整合成 1 个${to}。`,
      exchangeSubDone: (from, to) => `1 个${from}已经拆成 10 个${to}。`,
      nextPlace: place => `继续${place}`,
      finish: "完成运算",
      dragHintAdd: place => `当前只移动${place}积木。`,
      dragHintSub: (remaining, place) => `还要减去 ${remaining} 个${place}。`,
      needExchange: "数量不够，先进行换位演示。",
      completeAdd: answer => `完成！合并后的积木表示 ${answer}。`,
      completeSub: answer => `完成！剩下的积木表示 ${answer}。`,
      formulaAdd: "从个位开始相加；每满 10 个就换成左边 1 个较大的位值积木。",
      formulaSub: "从个位开始相减；不够减时，把左边 1 个较大的位值积木拆成 10 个。",
      targetRow: (count, place) => `${place}：减去 ${count} 个`,
      invalidNumber: "请输入完整的非负整数。",
      invalidOrder: "减法的第一个数必须大于或等于第二个数。",
      invalidRange: limit => `数字或答案必须在这个课本范围内（不超过 ${limit}）。`,
      subtraction1000: "这份资料没有展示三位数减法，所以减法只开放到 100 以内。",
      wrongDrop: "请把积木放到相同位值的区域。"
    },
    en: {
      title: "Explore Addition and Subtraction with Blocks!",
      subtitle: "See addition, subtraction and regrouping with place-value blocks.",
      addition: "Addition",
      subtraction: "Subtraction",
      teacherSetup: "Teacher settings",
      manualNumbers: "Enter numbers manually",
      range: "Textbook range",
      within40: "Within 40",
      within100: "Within 100",
      within1000: "Within 1000 (addition)",
      firstNumber: "First number",
      secondNumber: "Second number",
      build: "Build with blocks",
      reset: "Reset tool",
      sourceScopeTitle: "This tool covers textbook addition and subtraction only",
      noRandom: "No random questions; the teacher enters the numbers.",
      handsOn: "Try it!",
      currentOperation: "Current operation",
      stepBuild: "Build the numbers",
      stepOperate: "Move and regroup",
      stepExplain: "See the result",
      groupA: "Group A",
      groupB: "Group B",
      combineArea: "Combine area",
      startAmount: "Starting blocks",
      takeAwayTarget: "Take away",
      takeAwayTray: "Taken-away area",
      showFormula: "Show vertical form",
      oneBlock: "1 one",
      tenBlock: "1 ten = 10 ones",
      hundredBlock: "1 hundred = 10 tens",
      observe: "Observe",
      move: "Move the blocks",
      explain: "Explain regrouping",
      afterBlocks: "After completing the block operation",
      formulaTitle: "Explain with vertical form",
      ones: "ones",
      tens: "tens",
      hundreds: "hundreds",
      additionTitle: "Block Addition Lab",
      subtractionTitle: "Block Subtraction Lab",
      scopeAddition: "The textbook covers addition within 40, 100 and 1000, including no regrouping, regrouping ones and regrouping tens.",
      scopeSubtraction: "The textbook covers subtraction within 40 and 100, including no regrouping and changing 1 ten into 10 ones.",
      heroStartAdd: "Move both groups into the combine area, starting with the ones.",
      heroStartSub: "Move the required blocks out of the starting amount, beginning with the ones.",
      readyTitle: "Build the blocks first",
      readyText: "Press Build with blocks to begin.",
      moveAddTitle: place => `Combine the ${place} first`,
      moveAddText: place => `Drag the ${place} blocks from both groups into the combine area. You can also tap a block.`,
      moveSubTitle: place => `Subtract the ${place} first`,
      moveSubText: (count, place) => count ? `Drag ${count} ${place} blocks to the taken-away area. You can also tap a block.` : `No ${place} blocks need to be taken away in this step.`,
      exchangeAdd: (from, to) => `Demo: 10 ${from} → 1 ${to}`,
      exchangeSub: (from, to) => `Demo: 1 ${from} → 10 ${to}`,
      exchangeAddDone: (from, to) => `10 ${from} have been combined into 1 ${to}.`,
      exchangeSubDone: (from, to) => `1 ${from} has been split into 10 ${to}.`,
      nextPlace: place => `Continue to ${place}`,
      finish: "Complete operation",
      dragHintAdd: place => `Move only the ${place} blocks now.`,
      dragHintSub: (remaining, place) => `${remaining} more ${place} blocks must be taken away.`,
      needExchange: "There are not enough blocks. Run the regrouping demonstration first.",
      completeAdd: answer => `Complete! The combined blocks show ${answer}.`,
      completeSub: answer => `Complete! The remaining blocks show ${answer}.`,
      formulaAdd: "Add from the ones. Every group of 10 is changed into 1 block of the next place value.",
      formulaSub: "Subtract from the ones. When there are not enough blocks, split 1 block from the next place into 10.",
      targetRow: (count, place) => `${place}: take away ${count}`,
      invalidNumber: "Enter complete non-negative whole numbers.",
      invalidOrder: "For subtraction, the first number must be at least the second number.",
      invalidRange: limit => `The numbers and answer must stay in this textbook range (maximum ${limit}).`,
      subtraction1000: "The supplied material does not show three-digit subtraction, so subtraction stops at within 100.",
      wrongDrop: "Drop the block into the matching place-value area."
    },
    bm: {
      title: "Mari Teroka Tambah dan Tolak dengan Blok!",
      subtitle: "Lihat operasi tambah, tolak dan pengumpulan semula dengan blok nilai tempat.",
      addition: "Tambah",
      subtraction: "Tolak",
      teacherSetup: "Tetapan guru",
      manualNumbers: "Masukkan nombor sendiri",
      range: "Julat buku teks",
      within40: "Dalam lingkungan 40",
      within100: "Dalam lingkungan 100",
      within1000: "Dalam lingkungan 1000 (tambah)",
      firstNumber: "Nombor pertama",
      secondNumber: "Nombor kedua",
      build: "Bina dengan blok",
      reset: "Set semula alat",
      sourceScopeTitle: "Alat ini hanya untuk tambah dan tolak dalam buku teks",
      noRandom: "Tiada soalan rawak; guru memasukkan nombor.",
      handsOn: "Mari cuba!",
      currentOperation: "Operasi sekarang",
      stepBuild: "Bina nombor",
      stepOperate: "Gerak dan kumpul semula",
      stepExplain: "Lihat hasil",
      groupA: "Kumpulan A",
      groupB: "Kumpulan B",
      combineArea: "Ruang gabung",
      startAmount: "Blok asal",
      takeAwayTarget: "Perlu ditolak",
      takeAwayTray: "Ruang ditolak",
      showFormula: "Lihat bentuk lazim",
      oneBlock: "1 sa",
      tenBlock: "1 puluh = 10 sa",
      hundredBlock: "1 ratus = 10 puluh",
      observe: "Perhati",
      move: "Gerakkan blok",
      explain: "Terangkan kumpul semula",
      afterBlocks: "Selepas operasi blok selesai",
      formulaTitle: "Terangkan dengan bentuk lazim",
      ones: "sa",
      tens: "puluh",
      hundreds: "ratus",
      additionTitle: "Makmal Tambah Blok",
      subtractionTitle: "Makmal Tolak Blok",
      scopeAddition: "Buku teks menunjukkan tambah dalam lingkungan 40, 100 dan 1000, termasuk tanpa dan dengan pengumpulan semula.",
      scopeSubtraction: "Buku teks menunjukkan tolak dalam lingkungan 40 dan 100, termasuk menukar 1 puluh kepada 10 sa.",
      heroStartAdd: "Gerakkan kedua-dua kumpulan ke ruang gabung, bermula dengan sa.",
      heroStartSub: "Gerakkan blok yang perlu ditolak, bermula dengan sa.",
      readyTitle: "Bina blok dahulu",
      readyText: "Tekan Bina dengan blok untuk bermula.",
      moveAddTitle: place => `Gabungkan ${place} dahulu`,
      moveAddText: place => `Seret blok ${place} daripada kedua-dua kumpulan ke ruang gabung. Blok juga boleh disentuh.`,
      moveSubTitle: place => `Tolak ${place} dahulu`,
      moveSubText: (count, place) => count ? `Seret ${count} blok ${place} ke ruang ditolak. Blok juga boleh disentuh.` : `Tiada blok ${place} perlu ditolak pada langkah ini.`,
      exchangeAdd: (from, to) => `Demo: 10 ${from} → 1 ${to}`,
      exchangeSub: (from, to) => `Demo: 1 ${from} → 10 ${to}`,
      exchangeAddDone: (from, to) => `10 ${from} telah digabung menjadi 1 ${to}.`,
      exchangeSubDone: (from, to) => `1 ${from} telah dipecahkan menjadi 10 ${to}.`,
      nextPlace: place => `Teruskan ke ${place}`,
      finish: "Selesaikan operasi",
      dragHintAdd: place => `Gerakkan blok ${place} sahaja sekarang.`,
      dragHintSub: (remaining, place) => `${remaining} lagi blok ${place} perlu ditolak.`,
      needExchange: "Blok tidak mencukupi. Jalankan demonstrasi pengumpulan semula dahulu.",
      completeAdd: answer => `Selesai! Blok yang digabung menunjukkan ${answer}.`,
      completeSub: answer => `Selesai! Blok yang tinggal menunjukkan ${answer}.`,
      formulaAdd: "Tambah bermula dari sa. Setiap 10 blok ditukar kepada 1 blok nilai tempat di sebelah kiri.",
      formulaSub: "Tolak bermula dari sa. Jika blok tidak cukup, pecahkan 1 blok di sebelah kiri menjadi 10.",
      targetRow: (count, place) => `${place}: tolak ${count}`,
      invalidNumber: "Masukkan nombor bulat bukan negatif yang lengkap.",
      invalidOrder: "Untuk tolak, nombor pertama mesti sama atau lebih besar daripada nombor kedua.",
      invalidRange: limit => `Nombor dan jawapan mesti dalam julat buku teks ini (maksimum ${limit}).`,
      subtraction1000: "Bahan ini tidak menunjukkan tolak tiga digit, jadi tolak hanya sehingga lingkungan 100.",
      wrongDrop: "Letakkan blok dalam ruang nilai tempat yang sepadan."
    }
  };

  const elements = {
    rangeSelect: document.getElementById("rangeSelect"),
    numberA: document.getElementById("numberA"),
    numberB: document.getElementById("numberB"),
    inputError: document.getElementById("inputError"),
    buildBtn: document.getElementById("buildBtn"),
    resetBtn: document.getElementById("resetBtn"),
    scopeText: document.getElementById("scopeText"),
    activityTitle: document.getElementById("activityTitle"),
    rangeBadge: document.getElementById("rangeBadge"),
    equation: document.getElementById("equation"),
    heroHint: document.getElementById("heroHint"),
    instructionNumber: document.getElementById("instructionNumber"),
    instructionTitle: document.getElementById("instructionTitle"),
    instructionText: document.getElementById("instructionText"),
    additionBoard: document.getElementById("additionBoard"),
    subtractionBoard: document.getElementById("subtractionBoard"),
    sourceAGrid: document.getElementById("sourceAGrid"),
    sourceBGrid: document.getElementById("sourceBGrid"),
    resultGrid: document.getElementById("resultGrid"),
    minuendGrid: document.getElementById("minuendGrid"),
    removedGrid: document.getElementById("removedGrid"),
    removeTarget: document.getElementById("removeTarget"),
    valueA: document.getElementById("valueA"),
    valueB: document.getElementById("valueB"),
    resultValue: document.getElementById("resultValue"),
    subValueA: document.getElementById("subValueA"),
    subValueB: document.getElementById("subValueB"),
    removedProgress: document.getElementById("removedProgress"),
    exchangeBtn: document.getElementById("exchangeBtn"),
    nextBtn: document.getElementById("nextBtn"),
    formulaBtn: document.getElementById("formulaBtn"),
    feedback: document.getElementById("feedback"),
    formulaModal: document.getElementById("formulaModal"),
    modalClose: document.getElementById("modalClose"),
    verticalFormula: document.getElementById("verticalFormula"),
    formulaExplanation: document.getElementById("formulaExplanation")
  };

  const state = {
    lang: "zh",
    operation: "addition",
    range: 40,
    a: 28,
    b: 6,
    built: false,
    complete: false,
    busy: false,
    activePlaces: ["one", "ten"],
    placeIndex: 0,
    resultCounts: { one: 0, ten: 0, hundred: 0 },
    remainingCounts: { one: 0, ten: 0, hundred: 0 },
    removedCounts: { one: 0, ten: 0, hundred: 0 },
    targetCounts: { one: 0, ten: 0, hundred: 0 },
    exchangeLog: []
  };

  const tr = () => translations[state.lang];
  const placeLabel = place => ({ one: tr().ones, ten: tr().tens, hundred: tr().hundreds })[place];
  const symbol = () => state.operation === "addition" ? "+" : "−";
  const answer = () => state.operation === "addition" ? state.a + state.b : state.a - state.b;
  const activePlace = () => state.activePlaces[state.placeIndex];
  const nextPlace = place => places[places.indexOf(place) + 1] || null;

  function digitCounts(number) {
    return {
      one: number % 10,
      ten: Math.floor(number / 10) % 10,
      hundred: Math.floor(number / 100) % 10
    };
  }

  function rangeLimit() {
    if (state.range === 40) return 40;
    return state.range - 1;
  }

  function applyLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "bm" ? "ms" : "en";
    document.querySelectorAll("[data-lang]").forEach(button => button.classList.toggle("active", button.dataset.lang === lang));
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const value = tr()[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });
    updateRangeOptionState();
    updateStaticOperationText();
    if (state.built) {
      rebuildGridLabels();
      renderTargets();
      updateProgress();
    } else {
      showReadyInstruction();
    }
  }

  function updateStaticOperationText() {
    const addition = state.operation === "addition";
    elements.activityTitle.textContent = addition ? tr().additionTitle : tr().subtractionTitle;
    elements.scopeText.textContent = addition ? tr().scopeAddition : tr().scopeSubtraction;
    elements.heroHint.textContent = addition ? tr().heroStartAdd : tr().heroStartSub;
    elements.rangeBadge.textContent = elements.rangeSelect.options[elements.rangeSelect.selectedIndex].textContent;
    elements.equation.textContent = `${state.a} ${symbol()} ${state.b} = ${state.complete ? answer() : "?"}`;
  }

  function updateRangeOptionState() {
    for (const option of elements.rangeSelect.options) {
      const key = option.value === "40" ? "within40" : option.value === "100" ? "within100" : "within1000";
      option.textContent = tr()[key];
      option.disabled = state.operation === "subtraction" && option.value === "1000";
    }
    if (state.operation === "subtraction" && elements.rangeSelect.value === "1000") {
      elements.rangeSelect.value = "100";
      state.range = 100;
    }
    const max = rangeLimit();
    elements.numberA.max = String(max);
    elements.numberB.max = String(max);
  }

  function createPlaceGrid(container, role) {
    container.innerHTML = "";
    container.style.setProperty("--place-count", state.activePlaces.length);
    [...state.activePlaces].reverse().forEach(place => {
      const column = document.createElement("div");
      column.className = "place-column";
      column.dataset.place = place;
      const label = document.createElement("div");
      label.className = "place-label";
      label.dataset.placeLabel = place;
      label.textContent = placeLabel(place);
      const zone = document.createElement("div");
      zone.className = "block-zone drop-zone";
      zone.dataset.role = role;
      zone.dataset.place = place;
      column.append(label, zone);
      container.append(column);
    });
  }

  function rebuildGridLabels() {
    document.querySelectorAll("[data-place-label]").forEach(label => { label.textContent = placeLabel(label.dataset.placeLabel); });
  }

  function zoneFor(grid, place) {
    return grid.querySelector(`.block-zone[data-place="${place}"]`);
  }

  function createBlock(place, origin, animate = false) {
    const block = document.createElement("img");
    block.src = blockImages[place];
    block.alt = placeLabel(place);
    block.className = `math-block block-${place}${animate ? " block-pop" : ""}`;
    block.draggable = false;
    block.dataset.place = place;
    block.dataset.origin = origin;
    block.tabIndex = 0;
    block.addEventListener("pointerdown", beginDrag);
    block.addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && canMoveBlock(block)) {
        event.preventDefault();
        moveBlockToDestination(block);
      }
    });
    return block;
  }

  function appendBlocks(grid, counts, origin) {
    state.activePlaces.forEach(place => {
      const zone = zoneFor(grid, place);
      for (let i = 0; i < counts[place]; i += 1) zone.append(createBlock(place, origin));
    });
  }

  function renderTargets() {
    if (!state.built || state.operation !== "subtraction") return;
    elements.removeTarget.innerHTML = "";
    state.activePlaces.forEach(place => {
      const row = document.createElement("div");
      row.className = "target-row";
      row.dataset.targetPlace = place;
      row.innerHTML = `<span>${placeLabel(place)}</span><b>${state.removedCounts[place]} / ${state.targetCounts[place]}</b>`;
      elements.removeTarget.append(row);
    });
  }

  function buildOperation() {
    const a = Number(elements.numberA.value);
    const b = Number(elements.numberB.value);
    const error = validateNumbers(a, b);
    if (error) {
      elements.inputError.textContent = error;
      elements.inputError.hidden = false;
      return;
    }
    elements.inputError.hidden = true;
    state.a = a;
    state.b = b;
    state.range = Number(elements.rangeSelect.value);
    state.activePlaces = state.range === 1000 ? ["one", "ten", "hundred"] : ["one", "ten"];
    state.built = true;
    state.complete = false;
    state.busy = false;
    state.placeIndex = 0;
    state.resultCounts = { one: 0, ten: 0, hundred: 0 };
    state.remainingCounts = digitCounts(a);
    state.removedCounts = { one: 0, ten: 0, hundred: 0 };
    state.targetCounts = digitCounts(b);
    state.exchangeLog = [];

    [
      [elements.sourceAGrid, "sourceA"],
      [elements.sourceBGrid, "sourceB"],
      [elements.resultGrid, "result"],
      [elements.minuendGrid, "minuend"],
      [elements.removedGrid, "removed"]
    ].forEach(([grid, role]) => createPlaceGrid(grid, role));

    if (state.operation === "addition") {
      appendBlocks(elements.sourceAGrid, digitCounts(a), "sourceA");
      appendBlocks(elements.sourceBGrid, digitCounts(b), "sourceB");
      elements.additionBoard.hidden = false;
      elements.subtractionBoard.hidden = true;
      elements.valueA.textContent = a;
      elements.valueB.textContent = b;
      elements.resultValue.textContent = "?";
    } else {
      appendBlocks(elements.minuendGrid, state.remainingCounts, "minuend");
      elements.additionBoard.hidden = true;
      elements.subtractionBoard.hidden = false;
      elements.subValueA.textContent = a;
      elements.subValueB.textContent = b;
      renderTargets();
    }
    elements.formulaBtn.disabled = true;
    setStep(2);
    updateStaticOperationText();
    updateProgress();
  }

  function validateNumbers(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) return tr().invalidNumber;
    const limit = rangeLimit();
    if (a > limit || b > limit) return tr().invalidRange(limit);
    if (state.operation === "addition" && a + b > limit) return tr().invalidRange(limit);
    if (state.operation === "subtraction" && a < b) return tr().invalidOrder;
    return "";
  }

  function sourceBlocksRemaining(place) {
    return document.querySelectorAll(`.block-zone[data-role="sourceA"][data-place="${place}"] .math-block, .block-zone[data-role="sourceB"][data-place="${place}"] .math-block`).length;
  }

  function additionNeedsExchange(place) {
    return sourceBlocksRemaining(place) === 0 && state.resultCounts[place] >= 10 && Boolean(nextPlace(place));
  }

  function subtractionNeedsExchange(place) {
    const stillNeeded = state.targetCounts[place] - state.removedCounts[place];
    const higher = nextPlace(place);
    return stillNeeded > state.remainingCounts[place] && Boolean(higher) && state.remainingCounts[higher] > 0;
  }

  function canMoveBlock(block) {
    if (!state.built || state.complete || state.busy) return false;
    const place = block.dataset.place;
    if (place !== activePlace()) return false;
    if (state.operation === "addition") {
      return block.dataset.origin === "sourceA" || block.dataset.origin === "sourceB";
    }
    return block.dataset.origin === "minuend" && state.removedCounts[place] < state.targetCounts[place];
  }

  function beginDrag(event) {
    const block = event.currentTarget;
    if (!canMoveBlock(block)) return;
    event.preventDefault();
    const rect = block.getBoundingClientRect();
    const ghost = block.cloneNode(false);
    ghost.className = "drag-ghost";
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.append(ghost);
    block.style.opacity = ".28";
    const drag = {
      block,
      ghost,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
      frame: 0,
      x: event.clientX,
      y: event.clientY
    };
    block.setPointerCapture?.(event.pointerId);

    const paint = () => {
      drag.frame = 0;
      ghost.style.left = `${drag.x - drag.offsetX}px`;
      ghost.style.top = `${drag.y - drag.offsetY}px`;
    };
    const move = moveEvent => {
      drag.x = moveEvent.clientX;
      drag.y = moveEvent.clientY;
      if (Math.hypot(drag.x - drag.startX, drag.y - drag.startY) > 5) drag.moved = true;
      if (!drag.frame) drag.frame = requestAnimationFrame(paint);
      highlightDropTarget(drag.x, drag.y, block.dataset.place);
    };
    const end = endEvent => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", cancel);
      if (drag.frame) cancelAnimationFrame(drag.frame);
      document.querySelectorAll(".drop-ready").forEach(zone => zone.classList.remove("drop-ready"));
      ghost.remove();
      block.style.opacity = "";
      if (!drag.moved) {
        moveBlockToDestination(block);
      } else {
        const target = document.elementFromPoint(endEvent.clientX, endEvent.clientY)?.closest(".drop-zone");
        if (isValidDrop(block, target)) moveBlockToDestination(block, target);
        else showFeedback(tr().wrongDrop, "warning");
      }
    };
    const cancel = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", cancel);
      ghost.remove();
      block.style.opacity = "";
      document.querySelectorAll(".drop-ready").forEach(zone => zone.classList.remove("drop-ready"));
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end, { once: true });
    window.addEventListener("pointercancel", cancel, { once: true });
  }

  function destinationFor(block) {
    const grid = state.operation === "addition" ? elements.resultGrid : elements.removedGrid;
    return zoneFor(grid, block.dataset.place);
  }

  function isValidDrop(block, target) {
    if (!target || !canMoveBlock(block)) return false;
    const role = state.operation === "addition" ? "result" : "removed";
    return target.dataset.role === role && target.dataset.place === block.dataset.place;
  }

  function highlightDropTarget(x, y, place) {
    document.querySelectorAll(".drop-ready").forEach(zone => zone.classList.remove("drop-ready"));
    const target = document.elementFromPoint(x, y)?.closest(".drop-zone");
    const role = state.operation === "addition" ? "result" : "removed";
    if (target?.dataset.role === role && target.dataset.place === place) target.classList.add("drop-ready");
  }

  function moveBlockToDestination(block, explicitTarget = null) {
    if (!canMoveBlock(block)) return;
    const target = explicitTarget || destinationFor(block);
    const place = block.dataset.place;
    target.append(block);
    block.classList.add("block-pop");
    setTimeout(() => block.classList.remove("block-pop"), 360);

    if (state.operation === "addition") {
      block.dataset.origin = "result";
      state.resultCounts[place] += 1;
    } else {
      block.dataset.origin = "removed";
      block.classList.add("block-remove");
      state.remainingCounts[place] -= 1;
      state.removedCounts[place] += 1;
    }
    updateProgress();
  }

  async function runExchange() {
    if (state.busy || state.complete) return;
    const place = activePlace();
    const higher = nextPlace(place);
    if (!higher) return;
    state.busy = true;
    updateProgress();
    if (state.operation === "addition") await animateCombine(place, higher);
    else await animateSplit(higher, place);
    state.busy = false;
    updateProgress();
  }

  async function animateCombine(from, to) {
    const fromZone = zoneFor(elements.resultGrid, from);
    const toZone = zoneFor(elements.resultGrid, to);
    const blocks = [...fromZone.querySelectorAll(".math-block")].slice(0, 10);
    const zoneRect = fromZone.getBoundingClientRect();
    const centerX = zoneRect.left + zoneRect.width / 2;
    const centerY = zoneRect.top + zoneRect.height / 2;
    await Promise.all(blocks.map((block, index) => {
      const rect = block.getBoundingClientRect();
      return block.animate([
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${centerX - (rect.left + rect.width / 2)}px, ${centerY - (rect.top + rect.height / 2)}px) scale(.22)`, opacity: .15 }
      ], { duration: 620, delay: index * 18, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }).finished;
    }));
    blocks.forEach(block => block.remove());
    state.resultCounts[from] -= 10;
    state.resultCounts[to] += 1;
    toZone.append(createBlock(to, "result", true));
    state.exchangeLog.push({ type: "combine", from, to });
    showFeedback(tr().exchangeAddDone(placeLabel(from), placeLabel(to)), "success");
  }

  async function animateSplit(from, to) {
    const fromZone = zoneFor(elements.minuendGrid, from);
    const toZone = zoneFor(elements.minuendGrid, to);
    const block = fromZone.querySelector(".math-block");
    if (!block) return;
    const fromRect = block.getBoundingClientRect();
    const toRect = toZone.getBoundingClientRect();
    await block.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2)}px, ${toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2)}px) scale(.35)`, opacity: .12 }
    ], { duration: 720, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }).finished;
    block.remove();
    state.remainingCounts[from] -= 1;
    state.remainingCounts[to] += 10;
    for (let i = 0; i < 10; i += 1) {
      const child = createBlock(to, "minuend", true);
      child.style.animationDelay = `${i * 35}ms`;
      toZone.append(child);
    }
    state.exchangeLog.push({ type: "split", from, to });
    showFeedback(tr().exchangeSubDone(placeLabel(from), placeLabel(to)), "success");
  }

  function updateProgress() {
    if (!state.built) return;
    const place = activePlace();
    document.querySelectorAll(".block-zone").forEach(zone => zone.classList.toggle("active-place", zone.dataset.place === place));
    document.querySelectorAll(".math-block").forEach(block => block.classList.toggle("locked", !canMoveBlock(block)));

    let showExchange = false;
    let canContinue = false;
    if (state.operation === "addition") {
      showExchange = additionNeedsExchange(place);
      canContinue = sourceBlocksRemaining(place) === 0 && !showExchange;
      elements.instructionTitle.textContent = tr().moveAddTitle(placeLabel(place));
      elements.instructionText.textContent = tr().moveAddText(placeLabel(place));
      showFeedback(showExchange ? tr().needExchange : tr().dragHintAdd(placeLabel(place)), showExchange ? "warning" : "");
    } else {
      const stillNeeded = state.targetCounts[place] - state.removedCounts[place];
      showExchange = subtractionNeedsExchange(place);
      canContinue = stillNeeded === 0;
      elements.instructionTitle.textContent = tr().moveSubTitle(placeLabel(place));
      elements.instructionText.textContent = tr().moveSubText(state.targetCounts[place], placeLabel(place));
      showFeedback(showExchange ? tr().needExchange : tr().dragHintSub(Math.max(0, stillNeeded), placeLabel(place)), showExchange ? "warning" : "");
      elements.removedProgress.textContent = `${Object.values(state.removedCounts).reduce((sum, value) => sum + value, 0)} / ${Object.values(state.targetCounts).reduce((sum, value) => sum + value, 0)}`;
      renderTargets();
    }

    const higher = nextPlace(place);
    elements.exchangeBtn.hidden = !showExchange;
    elements.exchangeBtn.disabled = state.busy;
    if (showExchange) {
      elements.exchangeBtn.textContent = state.operation === "addition"
        ? tr().exchangeAdd(placeLabel(place), placeLabel(higher))
        : tr().exchangeSub(placeLabel(higher), placeLabel(place));
    }
    elements.nextBtn.disabled = !canContinue || state.busy;
    elements.nextBtn.textContent = state.placeIndex === state.activePlaces.length - 1 ? tr().finish : tr().nextPlace(placeLabel(state.activePlaces[state.placeIndex + 1]));
    elements.instructionNumber.textContent = String(state.placeIndex + 1);
  }

  function advancePlace() {
    if (elements.nextBtn.disabled || state.busy) return;
    if (state.placeIndex < state.activePlaces.length - 1) {
      state.placeIndex += 1;
      updateProgress();
    } else {
      finishOperation();
    }
  }

  function finishOperation() {
    state.complete = true;
    setStep(3);
    elements.resultValue.textContent = answer();
    elements.formulaBtn.disabled = false;
    elements.exchangeBtn.hidden = true;
    elements.nextBtn.disabled = true;
    elements.nextBtn.textContent = tr().finish;
    elements.instructionNumber.textContent = "✓";
    elements.instructionTitle.textContent = state.operation === "addition" ? tr().additionTitle : tr().subtractionTitle;
    elements.instructionText.textContent = state.operation === "addition" ? tr().completeAdd(answer()) : tr().completeSub(answer());
    showFeedback(state.operation === "addition" ? tr().completeAdd(answer()) : tr().completeSub(answer()), "success");
    updateStaticOperationText();
    document.querySelectorAll(".math-block").forEach(block => block.classList.add("locked"));
  }

  function showReadyInstruction() {
    elements.instructionNumber.textContent = "1";
    elements.instructionTitle.textContent = tr().readyTitle;
    elements.instructionText.textContent = tr().readyText;
    elements.feedback.textContent = tr().noRandom;
    elements.feedback.className = "feedback";
  }

  function showFeedback(message, type = "") {
    elements.feedback.textContent = message;
    elements.feedback.className = `feedback${type ? ` ${type}` : ""}`;
  }

  function setStep(step) {
    document.querySelectorAll(".step-strip li").forEach(item => item.classList.toggle("active", Number(item.dataset.step) === step));
  }

  function openFormula() {
    if (!state.complete) return;
    const width = state.range === 1000 ? 3 : 2;
    const pad = value => String(value).padStart(width, " ").split("").join(" ");
    elements.verticalFormula.innerHTML = `
      <div class="formula-line">${pad(state.a)}</div>
      <div class="formula-line operator">${symbol()} ${pad(state.b)}</div>
      <div class="formula-line">${pad(answer())}</div>
    `;
    elements.formulaExplanation.textContent = state.operation === "addition" ? tr().formulaAdd : tr().formulaSub;
    elements.formulaModal.hidden = false;
    elements.formulaModal.setAttribute("aria-hidden", "false");
    elements.modalClose.focus();
  }

  function closeFormula() {
    elements.formulaModal.hidden = true;
    elements.formulaModal.setAttribute("aria-hidden", "true");
    elements.formulaBtn.focus();
  }

  function switchOperation(operation) {
    if (state.busy) return;
    state.operation = operation;
    document.querySelectorAll("[data-operation]").forEach(button => button.classList.toggle("active", button.dataset.operation === operation));
    if (operation === "addition") {
      elements.numberA.value = "28";
      elements.numberB.value = "6";
      if (elements.rangeSelect.value === "1000") state.range = 1000;
    } else {
      if (elements.rangeSelect.value === "1000") elements.rangeSelect.value = "100";
      state.range = Number(elements.rangeSelect.value);
      elements.numberA.value = "32";
      elements.numberB.value = "9";
    }
    state.a = Number(elements.numberA.value);
    state.b = Number(elements.numberB.value);
    state.built = false;
    state.complete = false;
    updateRangeOptionState();
    updateStaticOperationText();
    buildOperation();
  }

  function resetTool() {
    if (state.busy) return;
    elements.numberA.value = state.operation === "addition" ? "28" : "32";
    elements.numberB.value = state.operation === "addition" ? "6" : "9";
    elements.rangeSelect.value = state.operation === "addition" ? "40" : "40";
    state.range = 40;
    state.a = Number(elements.numberA.value);
    state.b = Number(elements.numberB.value);
    buildOperation();
  }

  document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  document.querySelectorAll("[data-operation]").forEach(button => button.addEventListener("click", () => switchOperation(button.dataset.operation)));
  elements.rangeSelect.addEventListener("change", () => {
    state.range = Number(elements.rangeSelect.value);
    updateRangeOptionState();
    updateStaticOperationText();
  });
  elements.buildBtn.addEventListener("click", buildOperation);
  elements.resetBtn.addEventListener("click", resetTool);
  elements.exchangeBtn.addEventListener("click", runExchange);
  elements.nextBtn.addEventListener("click", advancePlace);
  elements.formulaBtn.addEventListener("click", openFormula);
  elements.modalClose.addEventListener("click", closeFormula);
  elements.formulaModal.addEventListener("click", event => { if (event.target === elements.formulaModal) closeFormula(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !elements.formulaModal.hidden) closeFormula(); });

  applyLanguage("zh");
  buildOperation();
})();
