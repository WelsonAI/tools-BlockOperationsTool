# Block Operations Tool

Interactive place-value block tool for textbook-based addition and subtraction.

## Learning scope

- Addition within 40, 100 and 1000
- Addition without regrouping
- Regrouping 10 ones into 1 ten
- Regrouping 10 tens into 1 hundred
- Subtraction within 40 and 100
- Subtraction without regrouping
- Regrouping 1 ten into 10 ones

The teacher enters the numbers manually. The tool does not generate random questions, and the answer remains hidden until the block operation is completed.

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

The automated smoke test expects a Chromium browser with the Chrome DevTools Protocol available on port `9223` and the local server on port `8788`.

```powershell
node tests/smoke.mjs
```

