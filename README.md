# Block Operations Tool

Interactive place-value block tool for student-driven addition and subtraction.

## How it works

- Blocks are ready to drag as soon as the page opens.
- The vertical working stays visible beside the blocks and fills as the pupil works.
- For addition, drag blocks into the matching result column. When 10 collect in one column, drag the yellow bundle one place higher to carry.
- For subtraction, drag blocks to the taken-away area. If there are too few, drag a block from the next non-empty higher place one place lower to split it into 10. This also supports a chain such as `1000 − 1`.
- The steps appear from top to bottom. There are no next-step or automatic regrouping buttons.
- Enter any non-negative whole numbers using digits `0`–`9`; the tool creates the required place-value columns without a preset range selector. For subtraction, the first number must be at least the second.
- The tool does not generate questions. The answer remains hidden until the pupil completes the block movement.

The supplied `Makmal edMath.pdf` remains the source for the original base-ten block method and examples. Larger numbers are user-entered applications of that method, not examples claimed to appear in the PDF.

## Languages

- Bahasa Melayu
- 中文
- English

## Run locally

Open `index.html`, or run the included local server:

```powershell
node tests/server.mjs
```

Then open `http://127.0.0.1:8788`.

## Smoke test

The automated smoke test expects a Chromium browser with the Chrome DevTools Protocol available on port `9223` and the local server on port `8788`. It checks real dragging, manual carrying and borrowing, larger input, three languages, and mobile layout.

```powershell
node tests/smoke.mjs
```

