# Project Handoff — Block Operations Tool

Last updated: 2026-10-14 (Asia/Kuala_Lumpur)

For the complete history of all mathematics tools, fixed-year repositories, shared rules, and previous fixes, read `MATH_TOOLS_MASTER_HANDOFF.md` first. This file contains the deeper implementation notes for Block Operations Tool.

## Read this first

The user is building interactive mathematics **tools** for teachers and pupils. These must help users explore textbook concepts directly. They must not become generic Q&A pages or automatically invented exercise generators.

All mathematical content must stay within the supplied textbook/reference material. Do not invent syllabus topics, question formats, examples presented as textbook content, or unsupported year-level coverage.

## Current task

This is a new standalone block-based addition and subtraction tool.

- Local project: `C:\Users\User\Desktop\BlockOperationsTool`
- First testing repository: `https://github.com/WelsonAI/tools-BlockOperationsTool.git`
- Production owner: `production248`
- Important publishing rule: push to `WelsonAI` first for testing. Push or copy to `production248` only after the user explicitly confirms the testing version is accepted.
- Original multi-function project: `C:\Users\User\Desktop\BlockMathToolMutiFunction`
- The original multi-function project must remain untouched unless the user explicitly asks to modify it.

## Curriculum source

Primary reference:

`C:\Users\User\Downloads\Makmal edMath.pdf`

The PDF was inspected page by page. Relevant content includes:

- Addition of ones and tens.
- Two-number addition without regrouping.
- Regrouping 10 ones into 1 ten.
- Regrouping 10 tens into 1 hundred.
- Addition within 40, within 100, and within 1000.
- Subtraction of ones and tens.
- Two-number subtraction without regrouping.
- Regrouping 1 ten into 10 ones.
- Subtraction within 40 and within 100.
- Operations proceed from ones to tens to hundreds.

The PDF examples establish the original base-ten block method. After reviewing the first test version, the user explicitly asked to remove fixed numerical ranges. The tool now applies the same exchange mechanism to user-entered whole numbers of any digit length. Larger inputs are not represented as textbook examples or newly invented questions.

Reference examples observed in the material include `24 + 3`, `17 + 20`, `14 + 25`, `28 + 6`, `14 + 18`, `27 − 4`, `34 − 20`, `38 − 22`, `32 − 9`, `40 − 29`, `42 + 56`, `33 + 18`, `54 − 38`, `271 + 27`, `145 + 112`, `215 + 126`, and `182 + 193`.

## User requirements and product decisions

- Only block addition and subtraction are included.
- No counting tool, number pattern tool, random question generator, quiz mode, or Q&A flow.
- Numbers are entered manually; there is no fixed 40/100/1000 range selector.
- The block supply appears immediately, but the addition and subtraction number panels start empty. Pupils must build the given number(s) before operating.
- The answer starts as `?` and is shown only after the learner completes the block operation.
- Reuse the one, ten, hundred, and thousand visual blocks from the previous Block Math tool. Higher place-value units have a clearly labelled tile.
- Addition must visibly demonstrate:
  - Pupils build both groups from the reusable block supply, then drag the groups into matching result columns.
  - When 10 blocks collect in a result column, pupils drag a yellow bundle to the next higher column to combine them into one.
- Subtraction must visibly demonstrate:
  - Pupils build the starting number from the supply, then drag blocks into a recycle bin labelled with the number to subtract, without a pre-decomposed answer hint or a `9/9`-style block counter.
  - Pupils can drag a mistaken block from the recycle bin back to its original place, including after the answer first appears.
  - When there are too few blocks, pupils drag one block from a higher column to the adjacent lower column and split it into 10. Consecutive borrowing across zero columns is supported.
- Blocks must support smooth pointer dragging. Tapping a block and keyboard Enter/Space are also supported.
- Ones are arranged exactly five per row. On narrow screens, the place-value columns stack vertically to keep all relevant columns visible.
- The vertical working is visible on the right from the start. It shows user-performed carries/borrows and fills result digits as the blocks are settled.
- The three guidance steps run from top to bottom. There are no exchange, next-step, or formula-modal buttons.
- Languages: Bahasa Melayu, Chinese, and English.
- Responsive layout must work on desktop and mobile without horizontal overflow.

## Current implementation

Main files:

- `index.html` — page structure.
- `styles.css` — responsive educational UI and animations.
- `app.js` — all interaction, language, validation, drag/drop, regrouping, and result logic.
- `assets/one.png` — purple one cube reused from the previous tool.
- `assets/ten.png` — green ten rod reused from the previous tool.
- `assets/hundred.png` — blue hundred flat reused from the previous tool.
- `assets/thousand.png` — thousand cube reused from the previous tool.
- `README.md` — project overview and local running instructions.
- `tests/server.mjs` — local static server on `http://127.0.0.1:8788`.
- `tests/smoke.mjs` — Chrome DevTools Protocol smoke test.
- `.gitignore` — excludes screenshots and temporary Chrome profiles.

Default demonstration: `28 + 6`. The A and B panels start empty; pupils drag blocks from the supply to make 28 and 6, then combine 10 ones into 1 ten.

Subtraction regression example: `32 − 9`, which requires splitting 1 ten into 10 ones.

## Validation rules

- Values must be non-negative whole numbers typed with digits 0–9.
- There is no preset numeric limit; BigInt and dynamic place-value columns support longer user-entered numbers.
- For subtraction, the first value must be greater than or equal to the second value.
- The tool does not generate or label larger inputs as textbook examples.

## Tests already completed

The automated smoke test passed all of the following:

- JavaScript syntax checks.
- All block images load successfully.
- Answer is hidden before completion.
- The default A and B panels are empty, the block supply is ready, and the vertical working is visible before any click.
- A real pointer drag places a block from the supply into A; then the learner builds the rest and can drag into the result.
- `28 + 6`: pupil drags the yellow ten-block bundle to carry and finishes at 34.
- `32 − 9`: pupil drags a ten to the ones column to borrow and finishes at 23.
- The subtraction board starts empty. Its recycle bin shows only the target number, and a taken-away block can be dragged back from the bin after completion.
- `500 − 28`: the learner builds 500, borrows twice, removes 28 by value, and finishes at 472; the bin no longer misleadingly reports `10/10` blocks.
- Ones form rows of five on desktop and mobile; mobile place-value columns stack without page overflow.
- `1000 − 1`: three consecutive pupil-driven borrows finish at 999.
- `999 + 1`: three consecutive pupil-driven carries finish at 1000.
- A 20-digit user-entered number creates 20 place-value columns without a range choice.
- BM, Chinese, and English switches work.
- Desktop and 390px mobile layouts have no horizontal overflow.
- No browser runtime errors were detected.

To run locally:

```powershell
cd C:\Users\User\Desktop\BlockOperationsTool
node tests\server.mjs
```

To repeat the automated test, start Chrome headless with DevTools Protocol on port 9223, keep the local server on port 8788, then run:

```powershell
node tests\smoke.mjs
```

## Next steps

The test version now starts with empty number panels and a reusable block supply. Pupils build the given numbers before combining or subtracting; subtraction uses a reversible recycle bin labelled with the target number only. Ones are grouped five per row. Treat this as a testing version until the user reviews it.

1. The project is pushed to `WelsonAI/tools-BlockOperationsTool` on branch `main`.
2. The live GitHub Pages testing link is `https://welsonai.github.io/tools-BlockOperationsTool/` (HTTP 200 verified on 2026-10-14).
3. Let the user test the tool and report changes.
4. Apply accepted fixes locally, test them, and push to the WelsonAI testing repository.
5. Only after explicit user approval, push/copy the approved version to the repository specified by the user under `production248`.

## Broader project conventions

- Existing tool repositories commonly use the `tools-` prefix.
- Year-specific repositories use names such as `tools-SmartNumberBuilderTool-MathYear1`.
- When a shared change applies to every year version, the user prefers updating all affected year repositories in one pass.
- Do not alter abacus or bead tools unless the user explicitly puts them in scope.
- Always distinguish an interactive teaching tool from a question generator.
- For textbook-dependent work, ask for or inspect the relevant textbook/PDF rather than guessing curriculum content.

