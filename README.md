# Trajectories — Website

Static website for the **Trajectories** scientific webinar series,
hosted for free on [GitHub Pages](https://pages.github.com/).

## Setup (one time)

1. Create a repository on GitHub (e.g. named `trajectories`).
   Tip: if you create a GitHub **organization** called `Trajectories`,
   both co-organizers own the repo equally and the site ends up at
   `trajectories.github.io/<repo>`.
2. Push the site files to the `main` branch:
   ```
   git init && git add . && git commit -m "Initial website"
   git remote add origin https://github.com/<owner>/trajectories.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: Deploy from a branch**,
   select `main` / `/ (root)` → Save.
4. The site is live at `https://<owner>.github.io/trajectories/`
   (takes up to a few minutes).

## Adding a new webinar

1. Open `index.html`.
2. Copy the `<article class="webinar"> … </article>` block in the
   *Upcoming Webinars* section.
3. Adapt the date, title, speaker and the sign-up / meeting link.
4. `git commit` + `git push` — the page updates automatically.

After a webinar has taken place, move its title into the *Previous
Webinars* list with a link to the recording, and delete the card from
*Upcoming*.

## Files

- `index.html` — the entire site (single page, no build step).
