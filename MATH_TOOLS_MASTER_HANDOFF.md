# Mathematics Tools Master Handoff

Last updated: 2026-10-14, Asia/Kuala_Lumpur

## Purpose of this document

This file transfers the full working context for the user's Malaysian primary mathematics tools. A new chat should read this document before changing code, publishing repositories, or suggesting new activities. The user should not have to repeat the curriculum rules, repository structure, completed work, or current next step.

## Non-negotiable product rules

1. These projects are classroom tools for teachers and pupils. They should be interactive manipulatives, demonstrations, builders, simulations, or visual laboratories.
2. Do not turn a tool into a generic question-and-answer page, reading drill, quiz flow, or story-question generator unless the user explicitly requests that format.
3. Every activity must follow the relevant Malaysian SK or SJKC textbook or another source supplied or approved by the user. Do not invent curriculum topics, year-level coverage, textbook examples, or unsupported calculation methods.
4. If the textbook source is missing, ask for the PDF or inspect an approved source before implementing curriculum-dependent content.
5. Answers that pupils are meant to discover should initially appear as `?` or remain hidden. Reveal them only after the intended manipulation or an explicit reveal action.
6. Controls must visibly change the mathematical model. A slider, dragged point, block, clock hand, shape, token, or card should update smoothly and directly.
7. Support Bahasa Melayu, Chinese, and English unless the specific tool states otherwise.
8. Keep desktop, tablet, and mobile layouts usable. Always check for horizontal overflow, clipped text, overlapping labels, deformed text, and unreachable controls.
9. Reuse the established warm yellow classroom visual system when extending existing tools.
10. Teacher settings should configure demonstration data or activities. They should not pretend to be an automatic question generator when the tool is meant for concept exploration.

## Repository and publishing workflow

The user uses two GitHub owners for different stages.

- `WelsonAI` is the development and testing location.
- `production248` is the production location for approved fixed-year editions.
- Push to `WelsonAI` first when the user asks to test a new or revised tool.
- Do not push to `production248` until the user explicitly approves the testing version.
- Existing repository names normally use the `tools-` prefix for production year editions.
- Fixed-year repositories follow names such as `tools-SmartNumberBuilderTool-MathYear1`.
- When one shared fix applies to every year edition, make the shared-source change, regenerate the editions, test them, and update every affected year repository in one pass.
- Preserve user changes and unrelated dirty files. Do not reset or overwrite them.

## Main tool inventory

### SmartNumberBuilderTool

- Local source: `C:\Users\User\Desktop\SmartNumberBuilderTool`
- Testing repository: `https://github.com/WelsonAI/SmartNumberBuilderTool.git`
- Fixed years: Math Year 1 to Math Year 6
- Purpose: place value, reading and writing numbers, expanded form, decomposing numbers, forming largest or smallest numbers, and ordering numbers.
- Number progression: Year 1 begins at 0 to 100 and Year 6 reaches 0 to 10,000,000.
- Completed work: built the interactive number builder, refined the activities, expanded it to Years 1 to 6, and exported the six fixed-year editions.
- Interaction: drag and drop plus tap-to-place, with language-specific number words.

### SmartNumberLineTool

- Local source: `C:\Users\User\Desktop\SmartNumberLineTool`
- Testing repository: `https://github.com/WelsonAI/SmartNumberLineTool.git`
- Fixed years: Math Year 1 to Math Year 3
- Purpose: number lines, comparison, rounding, approximation, increasing and decreasing patterns.
- Completed work: simplified the interface for younger pupils, added child-friendly styling and sound, corrected comparison and mobile layout, added pattern direction options, and exported three fixed-year editions.
- Important behavior: hidden-rule patterns must not expose the answer through scale marks.

### AbacusMathTool

- Local source: `C:\Users\User\Desktop\AbacusMathTool`
- Repository: `https://github.com/WelsonAI/AbacusMathTool.git`
- Current branch may be `codex/learning-experience` rather than `main`.
- Purpose: abacus or soroban learning.
- Completed work: viewport fitting, bead animation and sound polish, guided practice, custom practice questions, answer feedback sounds, and removal of streak mechanics.
- Current scope rule: do not split or change this tool unless the user explicitly asks. The user previously said to leave the abacus-related tools alone while checking the newly split tools.

### BeadMathTool

- Local source: `C:\Users\User\Desktop\BeadMathTool`
- Repository: `https://github.com/WelsonAI/BeadMathTool.git`
- Current branch may be `codex/bead-learning-experience` rather than `main`.
- Purpose: animated bead calculation learning.
- Completed work: animated bead learning experience.
- Current scope rule: do not split or change this tool unless the user explicitly asks.

### BlockMathToolMutiFunction

- Local source: `C:\Users\User\Desktop\BlockMathToolMutiFunction`
- Repository: `https://github.com/WelsonAI/BlockMathTools.git`
- Current branch may be `feature/free-custom-challenge` rather than `main`.
- Purpose: the earlier multi-function place-value block tool.
- Completed work: child-friendly learning experience, guided free-mode place-value exchanges, and custom questions in free mode.
- This project supplied the purple one cube, green ten rod, and blue hundred flat used by the new Block Operations Tool.
- Current scope rule: keep this original project unchanged unless the user explicitly asks to modify it.
- The untracked `tmp` directory contains PDF-processing work and is not a curriculum source by itself.

### SmartFractionVisualTool

- Local source: `C:\Users\User\Desktop\SmartFractionVisualTool`
- Testing repository: `https://github.com/WelsonAI/SmartFractionVisualTool.git`
- Fixed year: Math Year 3 only
- Curriculum basis: SJKC Year 3 Mathematics Jilid 1.
- Purpose: fractions as part of a group, circular pizza models, equivalent fraction bars, improper fractions and mixed numbers, and fractions linked to decimals and percentages.
- Completed work: built the visual tool, improved grouping and pizza models, added teacher-controlled questions, and exported the Year 3 edition.
- The tool remains visual and manipulative rather than a reading exercise.

### SmartTimeTool

- Local source: `C:\Users\User\Desktop\SmartTimeTool`
- Testing repository: `https://github.com/WelsonAI/SmartTimeTool.git`
- Fixed years: Math Year 2 to Math Year 6
- Purpose: analogue clocks, timelines, duration, time operations, calendars, time-unit conversion, world time, and date changes.
- Completed work: built the textbook-aligned tool, added a draggable clock, corrected the background, added gear-like clock ticks and sound, improved dragging, and exported five fixed-year editions.
- Curriculum progression:
  - Year 2: five-minute intervals, analogue and digital time, simple start or end time, 1 hour equals 60 minutes, and 1 day equals 24 hours.
  - Year 3: schedules, seconds, calendars, time relationships, and duration calculations.
  - Year 4: 12-hour and 24-hour systems, elapsed time, and larger time units.
  - Year 5: duration across dates and fractional or decimal time conversion.
  - Year 6: world time zones, time differences, and date changes.

### SmartMoneyTool

- Local source: `C:\Users\User\Desktop\SmartMoneyTool`
- Testing repository: `https://github.com/WelsonAI/SmartMoneyTool.git`
- Fixed years: Math Year 2 to Math Year 6
- Purpose: Malaysian money recognition and composition, operations, payment, saving and spending, foreign currencies, interest, credit, profit and loss, receipts, assets and liabilities, insurance and takaful.
- Completed work: expanded exact-payment products, aligned tools to primary textbooks, added upper-year tools, replaced a static insurance catalogue with a risk-flow tool, created a clearer insurance and takaful comparison, and exported five fixed-year editions.
- Important decisions from user feedback:
  - A modern payment topic must be a usable interactive payment tool, not Q&A.
  - Insurance and takaful must show an observable difference. A static card or category selector is not enough.
  - The current Year 6 approach compares insurance and takaful side by side and uses a drag-and-drop risk-flow model for premiums, contributions, protection, and risk sharing.
  - Money questions and examples must remain tied to the textbook scope.
- Currency images come from Bank Negara Malaysia sources and include an educational `CONTOH` overlay.
- Local untracked `.vscode` and `tmp` directories are not production files.

### SmartMeasurementLab

- Local source: `C:\Users\User\Desktop\SmartMeasurementLab`
- Testing repository: `https://github.com/WelsonAI/SmartMeasurementLab.git`
- Fixed years: Math Year 1 to Math Year 6
- Purpose: length, mass, liquid volume, scales, and unit relationships.
- Completed work: built the visual lab, aligned activities with textbook scales, and exported six fixed-year editions.
- Curriculum progression:
  - Year 1: non-standard units such as blocks, balance units, and cups.
  - Year 2: whole centimetres and standard g, kg, mL, and L.
  - Year 3: m and cm with whole-unit conversion, without introducing millimetres.
  - Year 4: whole millimetres and mm or cm plus m or km relationships.
  - Year 5: every millimetre as one tenth of a centimetre and decimal or fractional relationships.
  - Year 6: established units and decimal precision without inventing a finer ruler scale.

### SmartGeometryLab

- Local source: `C:\Users\User\Desktop\SmartGeometryLab`
- Testing repository: `https://github.com/WelsonAI/SmartGeometryLab.git`
- Fixed years: Math Year 2 to Math Year 6
- Purpose: 2D and 3D shapes, solid nets, point-grid drawing, prisms, symmetry, angle, lines, perimeter, area, volume, polygons, and circles.
- Completed work includes direct manipulation, draggable solids, flexible 3D drawing, net folding, corrected face numbering, 3D zoom, smooth pointer-follow dragging, and five fixed-year editions.
- Key quality rules:
  - This is a geometry manipulative, not a quiz site.
  - Angles and rotations begin at 0 degrees and support 1-degree adjustment where required.
  - Shape labels, faces, edges, and vertices must stay identifiable during movement.
  - Sliders and draggable geometry update continuously without rebuilding the board during a drag.

### SmartCoordinateRatioTool

- Local source: `C:\Users\User\Desktop\SmartCoordinateRatioTool`
- Testing repository: `https://github.com/WelsonAI/SmartCoordinateRatioTool.git`
- Fixed years: Math Year 4 to Math Year 6
- Purpose: coordinates, routes, ratio, proportion, unit rate, equivalent ratios, and scale.
- Completed work: built the tool, clarified route and ratio steps, completed curriculum ratio coverage, hid unknown ratio quantities until reveal, and exported three fixed-year editions.
- Curriculum progression:
  - Year 4: read and plot first-quadrant coordinates, build object ratios, and explore unit rates.
  - Year 5: horizontal and vertical distance, coordinate routes, part-to-part and part-to-whole ratios, and unknown proportional quantities.
  - Year 6: scaled grids, simplified equivalent ratios, and map distance conversion.
- Scope boundary: length, mass, capacity, and general unit conversion belong to Smart Measurement Lab.

### SmartDataProbabilityTool

- Local source: `C:\Users\User\Desktop\SmartDataProbabilityTool`
- Testing repository: `https://github.com/WelsonAI/SmartDataProbabilityTool.git`
- Fixed years: Math Year 4 to Math Year 6
- Purpose: chart construction, data analysis, statistics, pie charts, and probability.
- Completed work: built the learning tools, clarified chart, statistics and probability interactions, corrected label overlap, and exported three fixed-year editions.
- Curriculum progression:
  - Year 4: pictograph builder, bar-chart builder, and matching views of the same data.
  - Year 5: pie-chart explorer and mode, median, mean, and range laboratory.
  - Year 6: eight-sector 45-degree pie-chart builder and probability simulator using the five textbook chance categories.
- Important fixes made after user review:
  - Values 11 and 12 were made visually distinguishable.
  - Slider maximum behavior was corrected so value 12 does not appear to have unexplained remaining space.
  - Dragging was changed to follow the pointer smoothly.
  - The statistics laboratory no longer adds random values. Pupils or teachers choose the actual number buttons.
  - The statistics result area shows the calculations for mode, median, mean, and range instead of showing only the mean formula.
  - The 45-degree pie-chart interaction was clarified.
  - The probability tool was redesigned into three visible stages: select the observed colour, compare bag quantities, and verify through draws.
  - Probability teacher settings control the two actual colour counts instead of showing unrelated generic A, B, C, and D fields.
  - Probability labels and result text were fixed to prevent overlap and deformation.

### BlockOperationsTool

- Local source: `C:\Users\User\Desktop\BlockOperationsTool`
- Testing repository: `https://github.com/WelsonAI/tools-BlockOperationsTool.git`
- Production repository: not yet created or approved.
- Purpose: a new standalone place-value block tool containing only addition and subtraction.
- Curriculum source: `C:\Users\User\Downloads\Makmal edMath.pdf`
- Current state: the user requested a more direct student-operated workflow. The revised version is implemented and locally tested; it must remain a testing version until the user reviews it.
- Live testing page: `https://welsonai.github.io/tools-BlockOperationsTool/` (HTTP 200 verified on 2026-10-14).
- The supplied PDF provides the original base-ten block method and examples. The user explicitly removed the fixed numerical range controls; larger user-entered calculations apply the same block exchange method and are not labelled textbook examples.
- The block supply is ready on page load, while A, B, and the subtraction starting panel are empty. Students first build the given numbers by dragging reusable blocks into the correct place-value columns.
- In addition, students then move A and B into the result and drag the yellow group of 10 one place higher to carry. In subtraction, a recycle bin displays only the number to subtract (for example, `要减 28`); students decide which blocks to move into it. There is no `9/9`-style target counter or pre-decomposed subtraction hint.
- Mistaken blocks can be dragged from the recycle bin back to their original place, even after completion. Students drag a higher block one place lower to split it into 10, including cascading borrowing through zeros.
- Ones are arranged five per row. Small screens stack place-value columns vertically instead of hiding a column offscreen.
- The vertical working stays visible on the right and updates as pupils move, carry, or borrow. Guidance steps run top to bottom.
- Numbers are entered manually without a preset maximum; the tool creates place-value columns dynamically. There is no random question generator.
- The answer starts as `?` and appears only after the learner completes the block movement.
- The tool supports smooth drag, tap, keyboard operation, BM, Chinese, and English.
- Passed regression examples: 28 + 6 = 34, 32 - 9 = 23, 500 - 28 = 472, 1000 - 1 = 999, and 999 + 1 = 1000; reversible subtraction, a 20-digit input, and mobile layout were also checked.
- The original BlockMathToolMutiFunction was not modified.

## Production fixed-year repositories

The following local folders point to production repositories under `production248` and use branch `main`.

### Number Builder

- `https://github.com/production248/tools-SmartNumberBuilderTool-MathYear1.git`
- `https://github.com/production248/tools-SmartNumberBuilderTool-MathYear2.git`
- `https://github.com/production248/tools-SmartNumberBuilderTool-MathYear3.git`
- `https://github.com/production248/tools-SmartNumberBuilderTool-MathYear4.git`
- `https://github.com/production248/tools-SmartNumberBuilderTool-MathYear5.git`
- `https://github.com/production248/tools-SmartNumberBuilderTool-MathYear6.git`

### Number Line

- `https://github.com/production248/tools-SmartNumberLineTool-MathYear1.git`
- `https://github.com/production248/tools-SmartNumberLineTool-MathYear2.git`
- `https://github.com/production248/tools-SmartNumberLineTool-MathYear3.git`

### Fractions

- `https://github.com/production248/tools-SmartFractionVisualTool-MathYear3.git`

### Time

- `https://github.com/production248/tools-SmartTimeTool-MathYear2.git`
- `https://github.com/production248/tools-SmartTimeTool-MathYear3.git`
- `https://github.com/production248/tools-SmartTimeTool-MathYear4.git`
- `https://github.com/production248/tools-SmartTimeTool-MathYear5.git`
- `https://github.com/production248/tools-SmartTimeTool-MathYear6.git`

### Money

- `https://github.com/production248/tools-SmartMoneyTool-MathYear2.git`
- `https://github.com/production248/tools-SmartMoneyTool-MathYear3.git`
- `https://github.com/production248/tools-SmartMoneyTool-MathYear4.git`
- `https://github.com/production248/tools-SmartMoneyTool-MathYear5.git`
- `https://github.com/production248/tools-SmartMoneyTool-MathYear6.git`

### Measurement

- `https://github.com/production248/tools-SmartMeasurementLab-MathYear1.git`
- `https://github.com/production248/tools-SmartMeasurementLab-MathYear2.git`
- `https://github.com/production248/tools-SmartMeasurementLab-MathYear3.git`
- `https://github.com/production248/tools-SmartMeasurementLab-MathYear4.git`
- `https://github.com/production248/tools-SmartMeasurementLab-MathYear5.git`
- `https://github.com/production248/tools-SmartMeasurementLab-MathYear6.git`

### Geometry

- `https://github.com/production248/tools-SmartGeometryLab-MathYear2.git`
- `https://github.com/production248/tools-SmartGeometryLab-MathYear3.git`
- `https://github.com/production248/tools-SmartGeometryLab-MathYear4.git`
- `https://github.com/production248/tools-SmartGeometryLab-MathYear5.git`
- `https://github.com/production248/tools-SmartGeometryLab-MathYear6.git`

### Coordinates and Ratio

- `https://github.com/production248/tools-SmartCoordinateRatioTool-MathYear4.git`
- `https://github.com/production248/tools-SmartCoordinateRatioTool-MathYear5.git`
- `https://github.com/production248/tools-SmartCoordinateRatioTool-MathYear6.git`

### Data and Probability

- `https://github.com/production248/tools-SmartDataProbabilityTool-MathYear4.git`
- `https://github.com/production248/tools-SmartDataProbabilityTool-MathYear5.git`
- `https://github.com/production248/tools-SmartDataProbabilityTool-MathYear6.git`

## GitHub Pages URL convention

The user previously enabled GitHub Pages for the fixed-year repositories. Their expected public URL pattern is:

`https://production248.github.io/REPOSITORY_NAME/`

Example:

`https://production248.github.io/tools-SmartNumberBuilderTool-MathYear1/`

Do not assume a new repository already has Pages enabled. After pushing a new repository, verify Pages settings or ask the user to enable deployment from the `main` branch root, then test the published URL.

## Shared edition architecture

Most main Smart tools use a shared source repository and a `grade-config.js` file. Export scripts create fixed-year folders beside the shared project. A fixed-year edition hides the year selector while keeping the shared interaction and translation code.

When a shared change is requested:

1. Inspect the main source tool and all affected grade configurations.
2. Change the shared source first.
3. Run the repository export script.
4. Confirm the generated edition contains only its assigned year and tools.
5. Test representative desktop and mobile layouts.
6. Commit and push each affected fixed-year repository.
7. Give the user every affected repository and Pages link.

Do not patch only one generated year folder when the same behavior belongs in shared code, unless the user explicitly requests a one-year exception.

## Testing expectations

- Run syntax checks before publishing.
- Use the existing smoke tests when present.
- Verify the exact interaction the user reported, not only initial page load.
- Test at least one desktop viewport and one narrow mobile viewport.
- Inspect screenshots for clipping, overlap, unreadable values, distorted characters, and unexpected empty space.
- Test drag behavior with actual pointer movement when smooth dragging is a requirement.
- Confirm disabled curriculum options cannot be selected.
- Confirm language switching does not break labels or layout.
- Keep the answer hidden when discovery is part of the activity.

## Immediate continuation instructions

The active work is reviewing the revised BlockOperationsTool with the user and making any further requested refinements.

1. Read `C:\Users\User\Desktop\BlockOperationsTool\PROJECT_HANDOFF.md` for the detailed implementation and tests.
2. Open the live testing page at `https://welsonai.github.io/tools-BlockOperationsTool/` and review the user's feedback.
3. Reproduce any reported issue in the local source before changing it.
4. Keep every mathematical activity within `C:\Users\User\Downloads\Makmal edMath.pdf` and the user's stated scope of block addition and subtraction.
5. Implement accepted fixes in the local project, test the interactions, and push the updated `main` branch to `WelsonAI/tools-BlockOperationsTool`.
6. Verify the remote branch and the live GitHub Pages page after pushing.
7. Give the user the updated testing link and summarize the changes.
8. Update the handoff files when behavior or repository state changes.
9. Do not push this new tool to production248 until the user tests it and explicitly approves production publishing.

## Suggested first message for a new chat

Use this exact instruction after uploading this document:

`Read the attached Mathematics Tools Master Handoff completely. Continue from the Immediate continuation instructions. Preserve all curriculum, repository, testing, and publishing rules in the document. Do not make me repeat the previous project history.`

