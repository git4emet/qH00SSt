import type { OralNote } from "./extract";

export type DeskTodo = {
  id: string;
  desk: string;
  text: string;
  detail: string;
};

export type ConnectService = {
  id: string;
  name: string;
  delivery: "email" | "direct";
  openUrl: string;
  how: string;
};

export const DESKS = [
  "Petrography",
  "Geotechnical",
  "Pavements",
  "Construction",
  "Environmental",
  "Building",
  "Nondestructive",
  "GSOC",
  "Field",
] as const;

/** Hand-noted from this paste. Not a generated code reading. */
export const FIELD_NOTES: OralNote[] = [
  {
    id: "seed-heart",
    name: "The note has to travel with the build",
    trigger:
      "Passing the code forward made the next system ask again what the work was for. The written piece was moving without the oral piece.",
    next: "Keep the name, what set it off, and the action it was supposed to start. Leave the code in the original file.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-storefront",
    name: "A shop in the mall, not a new mall",
    trigger:
      "The correction was that the core is already standing. New work is a tenant: an adapter on a tool already in use, not another foundation.",
    next: "Pick one existing workflow. Put a small on-screen buffer in front of it. Pass a clean verb in, and a receipt of what was asked back out.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-lens",
    name: "The view is not the name of the thing",
    trigger:
      "A reduced picture (a face, a dashboard, a compressed page) was being treated as the identity of the source.",
    next: "Keep the source as the name. Call the picture a view, and say what the view left out.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-three",
    name: "Skill, need, and the resource that joins them",
    trigger: "Isolated facts were not yet a job a person could finish or hand to someone else.",
    next: "Name the skill, the need, and the resource that connects them. The next person should be able to pick up that connection without the raw dump.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-event",
    name: "Wake on the event, not the clock",
    trigger: "The mesh was moving because a timer expired, so the record said when, not why.",
    next: "Name the event that should move the work. Record what it was before and what it is after. The clock is not the reason.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-label",
    name: "A label stays a label until it is checked",
    trigger: "An automated classification was sliding into the record as if it were the thing that happened.",
    next: "Mark each link observed, derived, asserted, or source-backed. Do not promote the classifier’s word into a fact.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-register",
    name: "Say what it adds, then the next wire",
    trigger: "Audit language was framing finished pieces as things to catch out.",
    next: "Write what the piece contributes, and the one wiring step that lets it carry more.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-complaint",
    name: "Judgment is not the repair",
    trigger: "Seeing an unhandled fault and only passing the judgment along.",
    next: "Do the local action that changes the state, and leave a receipt of that action.",
    desk: "Field",
    source: "This conversation",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-petro",
    name: "Petrography does not break ground",
    trigger:
      "A petrography desk was asked to carry Gopher State One Call duties. Looking at a specimen is not excavation.",
    next: "Tie the specimen to the dig, core, or boring that produced it. If that collection used machine-powered equipment, the locate belongs to that field work, not to the thin section.",
    desk: "Petrography",
    source: "AET public services list petrography/chemistry. MN Statutes ch. 216D covers excavation.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-operator",
    name: "Each facility answers for itself",
    trigger: "A locate ticket notifies more than one underground operator. One mark on the ground is easy to misread as the whole site.",
    next: "Read each operator’s own response before anyone treats the area as ready. A clear from one operator is not a clear for the property.",
    desk: "GSOC",
    source: "GSOC ticketing page: positive response is per facility operator.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-wait",
    name: "The wait starts the next day",
    trigger: "A same-day reading of “48 hours” was going to put a crew on a site early.",
    next: "The 48 hours exclude the day the ticket is filed, weekends, and holidays, and the wait starts at 12:01 a.m. the day after GSOC confirms the ticket. Read the start time printed on the ticket.",
    desk: "GSOC",
    source: "GSOC state-laws page and 2026 handbook summary.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-depth",
    name: "Depth stays unknown until a record gives it",
    trigger: "A map of the work area was being read as if it also stated how deep a facility is.",
    next: "Keep horizontal area, depth, and time as three different facts. Unknown depth stays unknown. A planning ticket is design information, not permission to dig.",
    desk: "GSOC",
    source: "GSOC: a ticket does not establish facility depth. Planning tickets do not authorize excavation.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-handoff",
    name: "Four steps, and the locate is still unnamed",
    trigger:
      "The October 15 note replaced an open question with a path: engineers request the drill, the business office assigns the lot, E&D Logs receives the job, and the Drilling Coordinator directs the rig.",
    next: "The proposal, for Mr. Silver to confirm and not yet a rule, is that E&D Logs writes the ticket number and each operator’s response on the lot before that release. One gate. No new department.",
    desk: "GSOC",
    source: "Email “Works With Others??? Please try.”, 15 Oct 2026, from the EXET address.",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-walkie",
    name: "Ask whether the rig moves before a ticket exists",
    trigger: "The same note could not tell whether walkie direction ever happens before a locate ticket exists.",
    next: "Ask that before filling it in. If it happens, it is the first risk. Do not invent the answer.",
    desk: "Geotechnical",
    source: "Email “Works With Others??? Please try.”, 15 Oct 2026.",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-keep-tools",
    name: "Keep the desks they already work on",
    trigger:
      "A new screen was about to stand in for Spectra QEST and Construction Hive. Those are the systems the lab and the field already use.",
    next: "Leave them in place. A coordination view can sit beside them only after access is actually granted. No connection has been made.",
    desk: "Field",
    source: "AET publicly names Spectra QEST and Construction Hive. The October 15 note says no private connection exists.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-catalogue",
    name: "A public list is not the inventory",
    trigger: "Counts of methods and chains were being read as if they certified every instrument on the floor.",
    next: "Call a chain proposed. Call a named tool published. Leave serial number, calibration, and location unknown until a record gives them.",
    desk: "Field",
    source: "October 15 research note. Not an AET operations manual.",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-t277",
    name: "T 277 is not the petrographic exam",
    trigger: "A public pairing treated AASHTO T 277 as if it were ASTM C856.",
    next: "T 277 is the electrical indication of chloride penetration. C856 is the petrographic examination of hardened concrete. Do not copy the pairing into a procedure.",
    desk: "Petrography",
    source: "AASHTO T 277 / ASTM C1202 versus ASTM C856. Flagged in the October 15 note.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-lamps",
    name: "Two lamps, one specimen",
    trigger: "Plane-polarized and crossed-polarized light were being treated as one look.",
    next: "Record them as two observations. Each lamp shows a different property of the same piece.",
    desk: "Petrography",
    source: "October 15 parable, tied to ordinary polarized-light practice. Not an AET method.",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-crack",
    name: "Seeing the crack is not naming the cause",
    trigger: "A crack in the section was about to be written up as the mechanism.",
    next: "Describe the crack. Leave the cause open until a second observation supports it.",
    desk: "Petrography",
    source: "October 15 parable. Proposed distinction, not a signed report.",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-voids",
    name: "Seeing the voids is not the count",
    trigger: "Air voids noticed in the microscope were being treated as the air-void measurement.",
    next: "A look is not ASTM C457. The quantitative count is its own procedure.",
    desk: "Petrography",
    source: "ASTM C457 is the quantitative air-void method. October 15 parable.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-epr",
    name: "Each operator answers electronically, then the ground still counts",
    trigger: "A ticket status was being treated as clearance for the whole site.",
    next: "From 1 Aug 2026 each facility operator owes an electronic positive response through GSOC before the locate period ends. Read that status against the marks. One operator is not the others.",
    desk: "GSOC",
    source: "GSOC notice: mandatory electronic positive response starts 1 Aug 2026.",
    standing: "source-backed",
    codeSetAside: 0,
  },
  {
    id: "seed-phone-trust",
    name: "The phone does not inherit the laptop’s trust",
    trigger:
      "A local certificate on the workstation was expected to make the phone accept the same origin. Loopback was treated as one machine.",
    next: "Installing a local authority on the laptop does not trust the phone. 127.0.0.1 is whichever device is asking. A shared try needs a reachable name and trust on the phone itself.",
    desk: "Field",
    source: "Cross-device note pasted with the October 15 mail. Not a completed setup.",
    standing: "asserted",
    codeSetAside: 0,
  },
  {
    id: "seed-atlas",
    name: "Do not draw a point that was not named",
    trigger:
      "An atlas was described as 25 places — seven loops, seven paths, seven gates, four transforms — plus a generator that would later add 42 ports. The names were not in the file.",
    next: "A point enters when it has an id, a descriptor, two analogies, and a short evaluation. Until then it is not on the map.",
    desk: "Field",
    source: "Atlas note attached 17 Oct 2026. The point list itself was absent.",
    standing: "asserted",
    codeSetAside: 0,
  },
];

export const DESK_TODOS: DeskTodo[] = [
  {
    id: "p-receive",
    desk: "Petrography",
    text: "Receive the specimen with the project, who collected it, and where",
    detail: "The lab note starts at the handoff, not at the microscope.",
  },
  {
    id: "p-ticket",
    desk: "Petrography",
    text: "Write down the locate ticket of the dig or core that produced it",
    detail: "If machine-powered equipment made the hole and there is no ticket, send it back to the field lead. The lab does not invent a clearance.",
  },
  {
    id: "p-ask",
    desk: "Petrography",
    text: "Name the exam that was asked for, and do not invent a result",
    detail: "Aggregate petrography, hardened concrete, or another named exam. The result waits on the work.",
  },
  {
    id: "p-depth",
    desk: "Petrography",
    text: "Leave utility depth unknown unless a verified record states it",
    detail: "An as-built or an exposed facility can supply depth. A ticket and a paint mark do not.",
  },
  {
    id: "p-report",
    desk: "Petrography",
    text: "Point the report back at the field record",
    detail: "Request, ticket, each operator response, sample, exam, report. One chain.",
  },
  {
    id: "g-class",
    desk: "Geotechnical",
    text: "Say whether this assignment disturbs ground",
    detail: "Boring, test pit, and well are disturbance. A desk review of existing borings is not.",
  },
  {
    id: "g-white",
    desk: "Geotechnical",
    text: "White-line the excavation area before the locate",
    detail: "Physical marks, or electronic marks that carry the same information. Electronic white lining is allowed from 1 Jan 2026 when it is equivalent.",
  },
  {
    id: "g-file",
    desk: "Geotechnical",
    text: "File the locate, then use the start time on the ticket",
    detail: "At least 48 hours, not counting the filing day, weekends, or holidays. The clock starts at 12:01 a.m. the next day after GSOC confirms it.",
  },
  {
    id: "g-mile",
    desk: "Geotechnical",
    text: "If the excavation is about a mile or more, use a meet ticket",
    detail: "Adjacent sections that add up to a mile count. This is a coordination flag, not a filed ticket.",
  },
  {
    id: "v-split",
    desk: "Pavements",
    text: "Separate a scan from a core",
    detail: "GPR or a falling-weight pass is not the same act as cutting a core. Only the act that disturbs ground goes through the locate.",
  },
  {
    id: "c-who",
    desk: "Construction",
    text: "Name who is responsible for the excavation notice",
    detail: "Observation and testing are not the notice. The person who excavates still owns it.",
  },
  {
    id: "e-split",
    desk: "Environmental",
    text: "Separate a paper review from a boring or a well",
    detail: "A file review does not need a locate. Drilling and remedial excavation do, under the same field rules.",
  },
  {
    id: "b-near",
    desk: "Building",
    text: "If the work opens ground near a foundation, treat it as excavation",
    detail: "A visual or forensic walk is not a locate. Intrusive work beside buried lines is.",
  },
  {
    id: "n-split",
    desk: "Nondestructive",
    text: "Keep the scan on the non-intrusive side of the line",
    detail: "If the scan leads to a verification hole, that hole is a new field step with its own notice.",
  },
  {
    id: "s-each",
    desk: "GSOC",
    text: "Check every operator listed on the ticket",
    detail: "Statuses to record as they come back: not yet responded, marked, clear, delayed, in progress, no access. One status does not cover the others.",
  },
  {
    id: "s-hand",
    desk: "GSOC",
    text: "Near a mark, the close work is hand digging",
    detail: "GSOC describes a tolerance zone of 24 inches either side of an unexposed facility. This desk records that the crew was told. It does not clear them.",
  },
  {
    id: "s-plan",
    desk: "GSOC",
    text: "Do not dig on a planning ticket",
    detail: "A planning ticket asks what is in the area during design. It is not permission to excavate.",
  },
  {
    id: "s-release",
    desk: "GSOC",
    text: "Proposed: E&D Logs records the ticket and each response before release",
    detail:
      "Not adopted. The four-step path still has no named owner for the locate. This is the checkpoint offered for Mr. Silver to confirm. It does not add a department.",
  },
  {
    id: "g-before",
    desk: "Geotechnical",
    text: "Ask whether a rig is directed before a ticket exists",
    detail: "Unanswered in the October 15 note. Do not fill the blank. If the answer is yes, that is the first risk.",
  },
];

export const CONNECT: ConnectService[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    delivery: "email",
    openUrl: "https://chatgpt.com/",
    how: "Settings, then Data controls, then Export data. OpenAI emails a link. It can take a while, and the link expires about a day after it arrives. Download the zip and drop it here. This bench does not sign in for you.",
  },
  {
    id: "claude",
    name: "Claude",
    delivery: "email",
    openUrl: "https://claude.ai/settings/privacy",
    how: "Settings, then Privacy, then Export data. The mail often comes quickly. The link expires about 24 hours later. Drop conversations.json or the zip. Public share links from this paste opened onto a login wall, so they were not read.",
  },
  {
    id: "grok",
    name: "Grok",
    delivery: "email",
    openUrl: "https://grok.com/",
    how: "On grok.com open Settings, then Data controls, and request the download. History that lives on X can be a separate X export. Drop the zip, or the file named prod-grok-backend.json if that is what arrives.",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    delivery: "email",
    openUrl: "https://chat.deepseek.com/",
    how: "No one-click full export was confirmed in account settings. A share link is direct if you already have the file. A full archive is a request to the account’s privacy path, then a wait. Drop whatever file comes back.",
  },
  {
    id: "gemini",
    name: "Gemini",
    delivery: "email",
    openUrl: "https://takeout.google.com/",
    how: "Google Takeout prepares the file and emails when it is ready. Drop that download here. Takeout is the wait. The chat itself is not a bulk download.",
  },
  {
    id: "notebook",
    name: "NotebookLM",
    delivery: "direct",
    openUrl: "https://notebooklm.google.com/",
    how: "Direct. Download the notes file from this bench, open NotebookLM, and add that file as a source. There is no inbox to wait on.",
  },
];
