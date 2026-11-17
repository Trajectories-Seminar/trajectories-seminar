/* =========================================================
   TRAJECTORIES: LIST OF SESSIONS
   This is the only file to edit when a session is added or
   confirmed. The home page and each abstract page are built
   from it automatically.

   For each session, fill in:
     date         "YYYY-MM-DD"  (also used as the page address)
     time         e.g. "16:00 to 17:00 CET"
     speaker      full name; leave "" if not yet confirmed
     affiliation  institution
     title        title of the talk
     photo        file name of a square photo saved in img/speakers/
                  e.g. "jane-doe.jpg"; leave "" if none
     abstract     full abstract, between the two ` marks.
                  Leave an empty line between paragraphs.

   Sessions whose date has passed move to "Past sessions" by
   themselves. Keep the commas between blocks.
   ========================================================= */

const SESSIONS = [

  {
    date: "2027-01-25",
    time: "16:00 to 17:00 CET",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-02-22",
    time: "16:00 to 17:00 CET",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-03-29",
    time: "16:00 to 17:00 CET",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-04-26",
    time: "16:00 to 17:00 CET",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-05-31",
    time: "16:00 to 17:00 CET",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-06-28",
    time: "16:00 to 17:00 CET",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  }

  /* EXAMPLE of a confirmed session (copy, paste above, and edit):
  ,{
    date: "2027-01-25",
    time: "16:00 to 17:00 CET",
    speaker: "Jane Doe",
    affiliation: "University of Somewhere",
    title: "Growing up unequal: parental class and political engagement",
    photo: "jane-doe.jpg",
    abstract: `First paragraph of the abstract.

Second paragraph of the abstract.`
  }
  */
];

/* ---------------------------------------------------------
   Below this line: code that builds the pages. No need to edit.
   --------------------------------------------------------- */

const MAILING_LIST = "https://forms.gle/ykmVEqkMAmxYS43w5";

function fmtDate(iso, opts) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", opts);
}
function isConfirmed(s) { return s.speaker.trim() !== "" && s.title.trim() !== ""; }
function isPast(s) {
  const [y, m, d] = s.date.split("-").map(Number);
  return new Date(y, m - 1, d, 23, 59) < new Date();
}
function esc(t) {
  return String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function initials(name) {
  return name.split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}
function picHTML(s) {
  const img = s.photo ? `<img src="img/speakers/${esc(s.photo)}" alt="${esc(s.speaker)}" onerror="this.remove()">` : "";
  return `<div class="pic">${esc(initials(s.speaker))}${img}</div>`;
}
function whoHTML(s) {
  return `<p class="who"><b>${esc(s.speaker)}</b>${s.affiliation ? `<span>, ${esc(s.affiliation)}</span>` : ""}</p>`;
}
function dayHTML(s) {
  return `<div class="day">${fmtDate(s.date, { day: "numeric" })}<small>${fmtDate(s.date, { month: "short", year: "numeric" })}</small></div>`;
}
function rowHTML(s) {
  if (!isConfirmed(s)) {
    return `<li><div class="session tba">${dayHTML(s)}<p>To be announced</p></div></li>`;
  }
  return `<li><a class="session" href="session.html?date=${esc(s.date)}">
    ${dayHTML(s)}${picHTML(s)}
    <div><h3>${esc(s.title)}</h3>${whoHTML(s)}</div>
  </a></li>`;
}

/* Home page */
function renderSessionLists() {
  const sorted = [...SESSIONS].sort((a, b) => a.date.localeCompare(b.date));
  const up = sorted.filter(s => !isPast(s));
  const past = sorted.filter(s => isPast(s) && isConfirmed(s)).reverse();
  const upEl = document.getElementById("sessions-upcoming");
  upEl.innerHTML = up.length ? up.map(rowHTML).join("")
    : `<li><div class="session tba"><span></span><p>New sessions will be announced here soon.</p></div></li>`;
  if (past.length) {
    document.getElementById("sessions-past").innerHTML = past.map(rowHTML).join("");
    document.getElementById("past").hidden = false;
  }
}

/* Abstract page */
function renderSessionPage() {
  const el = document.getElementById("session");
  const date = new URLSearchParams(location.search).get("date");
  const s = SESSIONS.find(x => x.date === date && isConfirmed(x));
  if (!s) {
    el.innerHTML = `<div class="wrap" style="padding-top:56px"><p>This session could not be found. <a href="index.html#programme">See the full programme</a>.</p></div>`;
    return;
  }
  document.title = `${s.title} | Trajectories`;
  const full = fmtDate(s.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const paras = s.abstract.trim()
    ? s.abstract.trim().split(/\n\s*\n/).map(p => `<p>${esc(p.trim())}</p>`).join("")
    : `<p class="note">The abstract will be available soon.</p>`;
  el.innerHTML = `
    <div class="wrap talk-head">
      <div>
        <a class="back" href="index.html#programme">Back to the programme</a>
        <p class="when">${full}, ${esc(s.time)}</p>
        <h1>${esc(s.title)}</h1>
        ${whoHTML(s)}
      </div>
      ${picHTML(s)}
    </div>
    <section class="block"><div class="wrap">
      <h2>Abstract</h2>
      <div class="prose">${paras}
        ${isPast(s) ? "" : `<div class="attend"><p>The session is on Zoom. The link goes out to the mailing list beforehand.</p>
        <a class="join" href="${MAILING_LIST}" target="_blank" rel="noopener">Join the mailing list</a></div>`}
      </div>
    </div></section>`;
}
