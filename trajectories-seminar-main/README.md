# Trajectories: website

Static website for the **Trajectories** online seminar series, hosted on GitHub Pages. No build step: edit the files, commit, and push.

## Files

- `index.html`: main page (practical details, forthcoming sessions, format, about the series)
- `about.html`: *Who we are*, with photos and short bios of the convenors
- `legal.html`: legal notice
- `sessions.js`: the list of sessions (speaker, affiliation, title, photo, abstract). The only file to edit for the programme
- `session.html`: abstract page, filled in automatically from `sessions.js`
- `style.css`: all colours, fonts, and layout
- `logo.svg`: logo file, also used as the browser tab icon
- `img/`: convenor photos (`clara.jpg`, `giacomo.jpg`, portrait, about 800 x 1000 px); speaker photos go in `img/speakers/` (square)

## Changing colours or font

Everything is set at the top of `style.css`:

```css
--c-gold:#F5B400;
--c-red:#E5383B;
--c-blue:#1F5FD6;
--c-green:#14A06B;
--font:"Plus Jakarta Sans", ...;
```

The logo on the pages takes its colours from these values. `logo.svg` (the tab icon) has the colours written in the file, so update it too.

To change the font, replace the Google Fonts `<link>` in the `<head>` of each page and the `--font` value.

## Adding or updating a session

1. Open `sessions.js`.
2. Find the block with the right date and fill in `speaker`, `affiliation`, `title`, `photo`, and `abstract`.
3. Save the speaker photo in `img/speakers/` with the same file name written in `photo`.

The home page lists the session with photo, name, affiliation, title, and date. Clicking it opens the page with the full abstract. Sessions without a speaker show as "To be announced". Past sessions move to *Past sessions* by themselves.

## Publishing

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. The site updates a minute or two after each push.
