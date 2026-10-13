# manydisplays.com

The marketing site for [Many Displays](https://github.com/manydisplays/manydisplays). Plain HTML,
one CSS file (`style.css`) and a few lines of JavaScript (`site.js`); no build step. Served by
GitHub Pages from the `main` branch.

## Editing

- Pages: `index.html`, `support.html`, `privacy.html`, `terms.html`, `buy.html`, `404.html`.
- Brand assets in `assets/` are copies of `Resources/Brand` in the app repository; regenerate there.
- `appcast.xml` is the Sparkle feed; the release process adds `<item>`s.
- Open `index.html` in a browser to preview, or `python3 -m http.server` in this folder.

## Things still to fill in

- `buy.html`: the Lemon Squeezy checkout URL (one `<a id="checkout">`).
- The price: `PRICE` in `site.js` and the `<span data-price>` fallbacks.
- Screenshots: the `.placeholder` boxes in `index.html` (hero and the "problem" section).
