# Anna Lu — Personal Website

Source for https://www.annajlu.com. Plain static HTML/CSS/JS, hosted on Vercel (no build step).

## Pages

- `index.html` — home: intro, Andover Economic Review, experience, leadership, honors
- `research.html` — papers and abstracts, with read-only paper previews
- `policy.html` — campaigns, Iowans for Brighter Future, student diplomacy
- `arts.html` — piano and visual art

`vercel.json` turns on clean URLs (`/research` instead of `/research.html`) and redirects
`anna-lu.vercel.app` to `www.annajlu.com` so search engines index one domain.

## Adding a paper preview (no downloadable PDF)

1. Convert the PDF to page images: `pdftoppm -r 110 -png paper.pdf page` then convert to WebP.
2. Save them as `papers/<slug>/1.webp`, `2.webp`, …
3. In `research.html`, set that paper's `<div class="viewer" data-pages="N">` to the page count.

Do not commit the PDF itself.

## Local preview

```sh
python3 -m http.server 8000
```
Open http://localhost:8000 (use `/research.html` etc. locally; clean URLs only work on Vercel).
