export const CONTEXTS = [
  { id: "cyclic", label: "Cyclic Lab" },
  { id: "partychain", label: "PartyChain" },
  { id: "origami", label: "Origami OS" },
  { id: "catlabs", label: "CatLabs" },
  { id: "fieldstream", label: "FieldStream" },
  { id: "makerjournal", label: "Maker’s Journal" },
  { id: "voicebridge", label: "Voice Bridge" },
  { id: "sharedproject", label: "Shared Project" },
] as const;

export type ContextId = (typeof CONTEXTS)[number]["id"];
export type Policy = "allow" | "ask" | "block";

export type Capability = {
  id: string;
  labels: Record<ContextId, { forward: string; inverse: string }>;
  policy: Policy;
  inverseWhen?: string;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "source.create",
    policy: "allow",
    labels: {
      cyclic: { forward: "Card", inverse: "Hold" },
      partychain: { forward: "Invite", inverse: "Recall" },
      origami: { forward: "Fold", inverse: "Unfold" },
      catlabs: { forward: "Capture", inverse: "Cut" },
      fieldstream: { forward: "Sample", inverse: "Hold" },
      makerjournal: { forward: "Note", inverse: "Shelf" },
      voicebridge: { forward: "Listen", inverse: "Mute" },
      sharedproject: { forward: "File", inverse: "Park" },
    },
  },
  {
    id: "evidence.attach",
    policy: "allow",
    labels: {
      cyclic: { forward: "Cite", inverse: "Park" },
      partychain: { forward: "Witness", inverse: "Hold" },
      origami: { forward: "Pin", inverse: "Unpin" },
      catlabs: { forward: "Mark", inverse: "Clear" },
      fieldstream: { forward: "Log", inverse: "Hold" },
      makerjournal: { forward: "Source", inverse: "Draft" },
      voicebridge: { forward: "Tag", inverse: "Untag" },
      sharedproject: { forward: "Attach", inverse: "Detach" },
    },
  },
  {
    id: "mall.record",
    policy: "allow",
    labels: {
      cyclic: { forward: "Record", inverse: "Reset" },
      partychain: { forward: "Step", inverse: "Rewind" },
      origami: { forward: "Crease", inverse: "Flatten" },
      catlabs: { forward: "Take", inverse: "Redo" },
      fieldstream: { forward: "Advance", inverse: "Hold" },
      makerjournal: { forward: "Stamp", inverse: "Scratch" },
      voicebridge: { forward: "Mark", inverse: "Skip" },
      sharedproject: { forward: "Move", inverse: "Stay" },
    },
  },
  {
    id: "share.dispatch",
    policy: "ask",
    labels: {
      cyclic: { forward: "Export", inverse: "Revoke" },
      partychain: { forward: "Share", inverse: "Revoke" },
      origami: { forward: "Send", inverse: "Recall" },
      catlabs: { forward: "Go Live", inverse: "End Live" },
      fieldstream: { forward: "Submit", inverse: "Recall" },
      makerjournal: { forward: "Publish", inverse: "Unpublish" },
      voicebridge: { forward: "Hand Off", inverse: "Hold" },
      sharedproject: { forward: "Share", inverse: "Revoke" },
    },
  },
  {
    id: "launch.open",
    policy: "ask",
    labels: {
      cyclic: { forward: "Open", inverse: "Stay" },
      partychain: { forward: "Launch", inverse: "Stay" },
      origami: { forward: "Route", inverse: "Stay" },
      catlabs: { forward: "Cue", inverse: "Stay" },
      fieldstream: { forward: "Dispatch", inverse: "Stay" },
      makerjournal: { forward: "Look Up", inverse: "Stay" },
      voicebridge: { forward: "Call", inverse: "Stay" },
      sharedproject: { forward: "Open", inverse: "Stay" },
    },
  },
];

export function visibleButtons(context: ContextId, shareActive: boolean) {
  return CAPABILITIES.filter((c) => c.policy !== "block").map((c) => {
    const inverse = Boolean(shareActive && c.id === "share.dispatch");
    const pair = c.labels[context];
    return {
      capabilityId: c.id,
      verb: inverse ? pair.inverse : pair.forward,
      inverse,
      policy: c.policy,
    };
  });
}

export type LaunchService = {
  id: string;
  label: string;
  fillsQuery: boolean;
  href: (q: string) => string;
};

export const LAUNCH_SERVICES: LaunchService[] = [
  {
    id: "google",
    label: "Google",
    fillsQuery: true,
    href: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    fillsQuery: false,
    href: () => "https://chat.deepseek.com/",
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    fillsQuery: true,
    href: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
  },
  {
    id: "grok",
    label: "Grok",
    fillsQuery: false,
    href: () => "https://grok.com/",
  },
  {
    id: "copilot",
    label: "Copilot",
    fillsQuery: false,
    href: () => "https://github.com/copilot",
  },
  {
    id: "github",
    label: "GitHub",
    fillsQuery: true,
    href: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: "gemini",
    label: "Gemini",
    fillsQuery: false,
    href: () => "https://gemini.google.com/app",
  },
];

export function contextKey(context: ContextId, evidence: string, risk: string): string {
  return `hudctx://surface=${context}/scene=work/role=operator/phase=act/evidence=${evidence}/risk=${risk}`;
}
