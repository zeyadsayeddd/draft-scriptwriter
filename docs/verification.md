# Verification — centered portfolio and cohort averages

Verified on 15 October 2026 with Node and Chromium through Playwright.

## Layout and simplification

- Centered sticky navigation replaces the sidebar. Its geometric center matches the viewport center with zero measured offset at 320, 390, 768, and 1440 pixels.
- Name, role, headline, introduction, project captions, Arabic openings, section headings, feedback, About, and contact copy use centered alignment at every tested width.
- No horizontal document overflow at any tested viewport.
- The ZS monogram and favicon are removed; the hero begins with the name.
- Meta ads has a separate, always-visible section after retention. Three figures are visible without opening the report. A centered link connects the two sections, and Results remains active in both.
- The campaign report and full context remain in a single disclosure to keep the page concise.
- The hero hook widget, standalone script lab, process list, six engagement figures, and first-draft comparison controls are removed. Opening lines are displayed on project artwork; complete writing remains in project readers.
- About is one short personal paragraph. Reviews, campaign data, and contact fields remain identified as samples.

## Correct comparison semantics

The two lines are per-brand averages: Zeyad-scripted videos versus other brand videos. Each line is computed from individual clip records, not a relabeled single-video curve. Cohorts are disjoint and aligned by percentage of video length. Each video has equal weight, independently of its duration or views. The format and reporting period are shared within a brand. The sample comparison does not establish causal improvement.

Illustrative halfway/completion averages after display rounding:

| Brand | Scripted / other videos | Zeyad halfway | Brand halfway | Zeyad completion | Brand completion |
|---|---|---|---|---|---|
| Saba Coffee | 4 / 6 | 65% | 44% | 43% | 25% |
| BeitCare | 3 / 5 | 71% | 49% | 52% | 30% |
| Khutwa | 4 / 6 | 61% | 40% | 37% | 21% |

All figures are fictional fixtures, not measured client results.

## Automated and browser checks

`npm run check` and all five `npm test` cases pass. Tests cover complete scripts, requested identity, demo attribution, interpolation, duration normalization, equal video weighting, progress clamping, disjoint cohort IDs, complete valid retention timelines, aggregate endpoints, and HTTP/media ranges.

Browser checks passed for all three brand selectors, cohort counts, halfway and endpoint averages, two graph lines, slider Home/End navigation, data-table completeness and keyboard focus, project readers and alternative openings, correct case-to-graph linking and focus, Escape closing, reduced motion, centered alignment, and responsive graph width. No browser console errors or warnings observed.

axe-core WCAG 2 A/AA and WCAG 2.1 AA scans returned zero violations at 1440, 390, and 320 pixels, with disclosures open at 320, and with a project reader open at 320. Metadata contrast was strengthened. Automated scans are not a complete manual audit; Safari and Firefox were not checked.

Copy-email feedback, active navigation, optional manual video playback, and pause-on-close were verified in preceding iterations and are retained.

## Final previews

`desktop.png`, `hero-desktop.png`, `mobile.png`, `hero-mobile.png`, `viewer-attention.png`, `meta-ads.png`, `meta-ads-mobile.png`, and `case-study.png`. No public deployment was made.

## Meta ads visibility update

Rechecked the logo removal, visible campaign figures, handoff link, Results navigation state, report disclosure, and responsive metric sizing at 320, 390, 768, and 1440 pixels. The sample currency is styled separately from the amount to avoid crowding. Existing syntax checks and all five tests pass. Accessibility scans remain clear with the campaign disclosure closed and open. The local preview remains available at http://localhost:4175 for the user.
