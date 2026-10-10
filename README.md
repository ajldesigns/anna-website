# Anna Lu — Personal Website

Source for https://www.annajlu.com. Plain static HTML/CSS/JS, hosted on Vercel (no build step).

## Pages

- `index.html` — home: intro, Andover Economic Review, experience, leadership, honors
- `research.html` — papers, each with a short summary and abstract
- `policy.html` — campaigns, Iowans for Brighter Future, student diplomacy
- `arts.html` — piano and visual art

`vercel.json` turns on clean URLs (`/research` instead of `/research.html`) and redirects
`anna-lu.vercel.app` to `www.annajlu.com` so search engines index one domain.

## Social preview image

All four pages point at one shared Open Graph card, `images/og-card.jpg` — 1200×630, the standard
1.91:1 ratio. It is what appears when a link is pasted into a text message, LinkedIn, or Slack.

Do not edit that file by hand. It is rendered from HTML so it can be rebuilt exactly; `HANDOFF.md`
§12 has the recipe. Keep it at 1200×630 and strip metadata when saving.

## Adding a research entry

The research page describes each paper rather than publishing it. No paper file is ever uploaded,
served, or linked. Each entry is one `<article class="pub">`:

```html
<article class="pub reveal" id="short-slug">
  <span class="label">year · where · what</span>
  <h3>The paper's title</h3>
  <p class="venue">Recognition or award line</p>
  <p class="venue">Optional second line: status, dates, method</p>
  <div class="abstract">
    <span class="label">what it was for</span>
    <p>Short description of the assignment and the approach.</p>
  </div>
  <div class="abstract">
    <span class="label">abstract</span>
    <p>One paragraph: the question, the method, what it found.</p>
  </div>
  <div class="chips">
    <a class="chip" href="…" target="_blank" rel="noopener">Link label</a>
  </div>
</article>
```

Both text blocks run roughly 50 to 120 words. Copy on this site uses no quotation marks and no
em dashes. Keep concrete numbers, dates, and figures where they exist.

**Never commit the papers themselves.** The source PDFs and Word documents live outside this
repository. Only the summaries above are published.

## Motion

One gesture is used everywhere: a short rise and fade, eased out, played once. It is deliberately
restrained — the pacing comes from things arriving in sequence as you scroll, not from things
moving far.

**To make something appear on scroll, add `class="reveal"` to the container.** If it has more than
one element child, those children arrive in sequence (70ms apart, capped at five steps); otherwise
the element itself animates. That is the whole API — nothing else is needed.

Two rules keep it safe:

- **Never write `class="rv"` in the markup.** `script.js` adds it, and only to elements that start
  below the fold, so a group is never animated twice.
- **Nothing is hidden by CSS.** The animation is paused via `.hold`, which the script also adds.
  With JavaScript off, nothing is hidden and the page reads normally. Please keep it that way — do
  not add `opacity: 0` to a stylesheet rule for a reveal.

The masthead and the subpage headers animate with plain CSS keyframes rather than the script, so
they still play if the script fails. The parallax targets (the arch portrait and the divider) are
listed at the bottom of `script.js`. Everything is switched off under
`prefers-reduced-motion: reduce`, in a block kept at the very end of `styles.css` so it wins against
every rule above it.

## Local preview

```sh
python3 -m http.server 8000
```
Open http://localhost:8000 (use `/research.html` etc. locally; clean URLs only work on Vercel).
