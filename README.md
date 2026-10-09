# Anna Lu — Personal Website

Source for https://www.annajlu.com. Plain static HTML/CSS/JS, hosted on Vercel (no build step).

## Pages

- `index.html` — home: intro, Andover Economic Review, experience, leadership, honors
- `research.html` — papers, each with a short summary and abstract
- `policy.html` — campaigns, Iowans for Brighter Future, student diplomacy
- `arts.html` — piano and visual art

`vercel.json` turns on clean URLs (`/research` instead of `/research.html`) and redirects
`anna-lu.vercel.app` to `www.annajlu.com` so search engines index one domain.

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

## Local preview

```sh
python3 -m http.server 8000
```
Open http://localhost:8000 (use `/research.html` etc. locally; clean URLs only work on Vercel).
