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
    date: "2027-01-26",
    time: "16:00 to 17:00 CET",
    speaker: "Anne-Marie Jeannet",
    affiliation: "University of Milan",
    title: "Is Taking the ‘Road Less Traveled’ the Key to a ‘Good Life’? Longitudinal Evidence from Switzerland",
    photo: "AMJ_prof_photo.jpg",
    abstract: `Does following an unexpected occupational path contribute to a good life? Sociological research has long examined how social origins shape occupational destinations, yet less is known about how departing from these structurally predicted destinations relates to people’s assessments of their lives. This study tests two competing hypotheses: that individuals report better lives when their occupational destinations align with those predicted by their backgrounds, or that taking a less predictable path is associated with more positive life evaluations. Drawing on longitudinal data from the Swiss Household Panel, we use supervised machine learning to estimate the probability of individuals’ observed occupations given their early-life characteristics. We develop two measures of occupational unexpectedness: one based on demographic characteristics and family background, and another incorporating educational attainment. We then examine how occupational unexpectedness relates to three retrospective evaluations measured in 2025: happiness, meaningfulness, and psychological richness. Secondary analyses explore differences by gender and occupational status. By distinguishing the predictability of an occupational destination from its position in the occupational hierarchy, the study extends research beyond conventional accounts of upward and downward mobility. It connects the social structuring of life chances to the subjective experience of a good life, asking whether lives that depart from expected pathways are experienced as happier, more meaningful, or richer in interesting experiences.`
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
    date: "2027-04-05",
    time: "16:00 to 17:00 CEST",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-04-26",
    time: "16:00 to 17:00 CEST",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-06-07",
    time: "16:00 to 17:00 CEST",
    speaker: "",
    affiliation: "",
    title: "",
    photo: "",
    abstract: ``
  },

  {
    date: "2027-06-28",
    time: "16:00 to 17:00 CEST",
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
  bindCalendarButtons();
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
        ${isPast(s) ? "" : `<p class="calrow"><button type="button" class="cal" data-cal="${esc(s.date)}">Add to calendar</button><a class="gcal" href="${googleLink(s)}" target="_blank" rel="noopener">Google Calendar</a></p>`}
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
  bindCalendarButtons();
}

/* ---------------------------------------------------------
   Calendar files (.ics), built from the list above.
   Times are read as Italian time (Europe/Rome), so summer
   time is handled automatically.
   --------------------------------------------------------- */

const SITE_URL = "https://trajectories-seminar.github.io/trajectories-seminar/";
const ZOOM_NOTE = "Online on Zoom. The Zoom link will be sent by email to the mailing list before the session.";

/* Start and end of a session as UTC Date objects */
function sessionTimes(s) {
  const t = s.time.match(/(\d{1,2}):(\d{2})\D+(\d{1,2}):(\d{2})/);
  const [y, m, d] = s.date.split("-").map(Number);
  const sh = t ? +t[1] : 16, sm = t ? +t[2] : 0;
  const eh = t ? +t[3] : sh + 1, em = t ? +t[4] : sm;
  return { start: romeToUTC(y, m, d, sh, sm), end: romeToUTC(y, m, d, eh, em) };
}
function romeToUTC(y, m, d, hh, mm) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome", hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
  }).formatToParts(new Date(guess)).reduce((o, p) => (o[p.type] = p.value, o), {});
  const asRome = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(guess - (asRome - guess));
}
function icsStamp(dt) { return dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
function icsText(t) { return String(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
function icsFold(line) {
  const out = []; let cur = "", bytes = 0;
  for (const ch of line) {
    const b = new TextEncoder().encode(ch).length;
    if (bytes + b > 74) { out.push(cur); cur = " "; bytes = 1; }
    cur += ch; bytes += b;
  }
  out.push(cur); return out.join("\r\n");
}
function sessionURL(s) { return isConfirmed(s) ? `${SITE_URL}session.html?date=${s.date}` : SITE_URL; }
function eventTitle(s) {
  return isConfirmed(s)
    ? `Trajectories seminar: ${s.speaker}${s.affiliation ? " (" + s.affiliation + ")" : ""}`
    : "Trajectories seminar: speaker to be announced";
}
function eventDetails(s) {
  const lines = [];
  if (isConfirmed(s)) {
    lines.push(`"${s.title}"`);
    lines.push(`${s.speaker}${s.affiliation ? ", " + s.affiliation : ""}`);
    lines.push("");
  } else {
    lines.push("Speaker and title to be announced.", "");
  }
  lines.push(ZOOM_NOTE);
  lines.push(`Join the mailing list: ${MAILING_LIST}`);
  lines.push(isConfirmed(s) ? `Abstract: ${sessionURL(s)}` : `Programme: ${SITE_URL}`);
  return lines.join("\n");
}
function buildICS(list) {
  const now = icsStamp(new Date());
  const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Trajectories seminar series//EN",
    "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:Trajectories seminars", "X-WR-TIMEZONE:Europe/Rome"];
  for (const s of list) {
    const { start, end } = sessionTimes(s);
    L.push("BEGIN:VEVENT",
      `UID:trajectories-${s.date.replace(/-/g, "")}@trajectories-seminar.github.io`,
      `DTSTAMP:${now}`, `DTSTART:${icsStamp(start)}`, `DTEND:${icsStamp(end)}`,
      `SUMMARY:${icsText(eventTitle(s))}`,
      `DESCRIPTION:${icsText(eventDetails(s))}`,
      "LOCATION:Online (Zoom)", `URL:${sessionURL(s)}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Trajectories seminar", "TRIGGER:-PT30M", "END:VALARM",
      "END:VEVENT");
  }
  L.push("END:VCALENDAR");
  return L.map(icsFold).join("\r\n") + "\r\n";
}
function downloadICS(list, filename) {
  const blob = new Blob([buildICS(list)], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function googleLink(s) {
  const { start, end } = sessionTimes(s);
  const q = new URLSearchParams({
    action: "TEMPLATE", text: eventTitle(s),
    dates: `${icsStamp(start)}/${icsStamp(end)}`,
    details: eventDetails(s), location: "Online (Zoom)", ctz: "Europe/Rome"
  });
  return "https://calendar.google.com/calendar/render?" + q.toString();
}
function bindCalendarButtons() {
  document.querySelectorAll("[data-cal]").forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      const key = btn.dataset.cal;
      if (key === "all") {
        const list = [...SESSIONS].filter(s => !isPast(s)).sort((a, b) => a.date.localeCompare(b.date));
        downloadICS(list, "trajectories-seminars.ics");
      } else {
        const s = SESSIONS.find(x => x.date === key);
        if (s) downloadICS([s], `trajectories-${key}.ics`);
      }
    });
  });
}
