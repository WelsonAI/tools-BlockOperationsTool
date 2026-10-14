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

The supplied PDF does not establish three-digit subtraction, so this tool intentionally disables subtraction within 1000.

Reference examples observed in the material include `24 + 3`, `17 + 20`, `14 + 25`, `28 + 6`, `14 + 18`, `27 − 4`, `34 − 20`, `38 − 22`, `32 − 9`, `40 − 29`, `42 + 56`, `33 + 18`, `54 − 38`, `271 + 27`, `145 + 112`, `215 + 126`, and `182 + 193`.

## User requirements and product decisions

- Only block addition and subtraction are included.
- No counting tool, number pattern tool, random question generator, quiz mode, or Q&A flow.
- The teacher manually enters both numbers.
- The answer starts as `?` and is shown only after the learner completes the block operation.
- Reuse the visual blocks from the previous Block Math tool.
- Addition must visibly demonstrate:
  - 10 ones gathering and changing into 1 ten.
  - 10 tens gathering and changing into 1 hundred.
- Subtraction must visibly demonstrate:
  - 1 ten changing into 10 ones when there are not enough ones.
- Blocks must support smooth pointer dragging. Tapping a block and keyboard Enter/Space are also supported.
- A vertical-form explanation becomes available only after the block operation is complete.
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
- `README.md` — project overview and local running instructions.
- `tests/server.mjs` — local static server on `http://127.0.0.1:8788`.
- `tests/smoke.mjs` — Chrome DevTools Protocol smoke test.
- `.gitignore` — excludes screenshots and temporary Chrome profiles.

Default demonstration: `28 + 6`, which requires exchanging 10 ones for 1 ten.

Subtraction regression example: `32 − 9`, which requires splitting 1 ten into 10 ones.

## Validation rules

- Values must be non-negative whole numbers.
- Within-40 mode: values and answer may not exceed 40.
- Within-100 mode: values and answer may not exceed 99.
- Within-1000 addition: values and answer may not exceed 999.
- For subtraction, the first value must be greater than or equal to the second value.
- Within-1000 is disabled for subtraction because it is not supported by the supplied PDF.

## Tests already completed

The automated smoke test passed all of the following:

- JavaScript syntax checks.
- All block images load successfully.
- Answer is hidden before completion.
- A real pointer drag moves a block to the correct place-value column.
- `28 + 6` exchanges 10 ones for 1 ten and finishes as 34.
- `32 − 9` splits 1 ten into 10 ones and finishes as 23.
- `182 + 193` exchanges 10 tens for 1 hundred and finishes as 375.
- The vertical-form button unlocks only after completion.
- The subtraction 1000 option remains disabled.
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

The user has said the current addition/subtraction experience is not yet what they want and will provide detailed changes. Treat the live page as a test draft.

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

