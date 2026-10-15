# Zeyad Sayed — Centered scriptwriter portfolio

A buildless static portfolio with centered navigation, a short profile, visual script previews, per-brand retention averages, feedback, and a concise About. Meta ads figures stay visible; full project details and campaign evidence open on demand.

GitHub Pages: https://zeyadsayeddd.github.io/draft-scriptwriter/

## Preview

```sh
cd scriptwriter-portfolio
npm run dev
```

Open **http://localhost:4175**. No installation or build is required. Change the port with `PORT=4180 npm run dev`.

## Content

Edit `content/portfolio.js`:

- **Profile:** Zeyad Sayed is the requested name. Biography, location, contact details, reviews, and results remain draft content. `profile.isDemo: true` displays a reserved `.example` address and masked phone without activating messages. Copy email copies that sample address. Supply real details and set `isDemo: false` to enable valid email and `https://wa.me/` links.
- **Writing:** Saba Coffee, BeitCare, and Khutwa are concept brands. Their opening lines appear on illustrated project frames. Each reader contains a specific brief, deliverables, timed Arabic script, three alternative openings, and visual direction. No supplied portfolio's footage or clients are attributed to Zeyad.
- **Navigation:** one horizontally centered sticky pill contains Work, Results, Feedback, and Get in touch. It tracks the current section. The former sidebar, hero hook widget, and ZS monogram have been removed. The browser tab has no logo.
- **Results:** each brand has `writerVideos` and `brandVideos`, which are disjoint cohorts of individual sample clips. Each clip has an ID, duration in seconds, and `[seconds, percent retained]` points. The `video` helper creates deterministic sample records from specified retention values.
- **Averages:** for each percentage of playback, retention is interpolated at that percentage of every clip's duration, then averaged equally across clips. Brand average excludes Zeyad-scripted clips. This handles videos of different lengths without comparing unlike absolute seconds. Both cohorts share the brand's sample format and reporting period. It is a descriptive comparison, not a causal claim.
- **Graph:** two lines show Zeyad's scripted-video average and the brand baseline. A normalized 0–100% slider, two summary figures, cohort counts, and an accessible data table expose the same calculations. Project readers link to the correct brand's graph.
- **Meta ads:** a dedicated light section follows the dark retention graph, linked by a centered “Next: Meta ads” handoff. Three figures are always visible. Campaign context and the report use one disclosure, and Results stays active across both sections. Optional metric `unit` text is smaller to keep currency values readable on mobile.
- **Reviews and campaign:** quotes are illustrative. `campaign.mode: 'demo'` shows sample figures and a mock report. Real mode requires complete context, a dated evidence image with alt text, verified values, and `verified: true`. The included report is not a Meta export.
- **Video:** optional project `media: { src: 'assets/my-ad.mp4', poster: 'assets/my-poster.jpg' }` enables manual native video playback. Closing the reader pauses it.

Replace fictional content with approved real material before removing sample labels or publishing performance claims. Review corresponding disclosure text in the HTML and renderer. The draft remains `noindex, nofollow`.

## Checks

```sh
npm run check
npm test
```

Five tests cover scripts, identity and attribution, normalized equal-weight cohort averaging, disjoint and complete video records, and HTTP/media-range behavior. Browser and accessibility verification is recorded in `docs/verification.md`. Final screenshots include desktop, mobile, viewer attention, Meta ads, and a case study.

Any static host can serve this folder, including under a subdirectory. GitHub Pages is configured to publish this repository's `main` branch at the URL above. Original SVG illustrations and self-hosted fonts are local; font licenses are retained in `assets/fonts/`.

## GitHub Pages

This is a static website; GitHub Pages does not need Node, npm, or a build command to serve it. `index.html` lives in the repository root, and all scripts, images, styles, and fonts use relative paths compatible with `/draft-scriptwriter/`. `.nojekyll` disables Jekyll processing.

Publish from **Settings → Pages → Deploy from a branch → main → / (root)**. Changes pushed to `main` are published automatically. Keep `assets/`, `content/`, `app.js`, `performance.js`, and `styles.css` beside `index.html`. `scripts/` and `tests/` are local development tools.
