# Context Buttonscape — draft v0.1

## Purpose

Compress reusable functions into a small HUD vocabulary without coupling a button to a connector, vendor, or single screen.

```text
capability
→ context
→ visible label
→ command envelope
→ route
→ receipt
```

A button is a projection of a capability. It is not the capability itself.

## Exposure law

A capability is rendered only when the runtime reports:

```text
observed ∩ supported ∩ granted ∩ context ∩ policy
```

Policy behavior:

- `allow` — visible and active
- `ask` — visible, pulsing, confirmation required
- `block` — not rendered

## Synantonyms

Each concept stores:

- at least 16 synonym labels;
- at least 16 antonym/inverse labels;
- short context labels for the visible button;
- one stable capability identifier.

Example:

```text
share.dispatch
PartyChain      → Invite / Recall
Fleet Academy   → Hand Out / Hold
CatLabs         → Go Live / End Live
FieldStream     → Submit / Recall
Maker’s Journal → Publish / Unpublish
Shared Project  → Share / Revoke
```

The label changes. The capability identity and command contract do not.

## Command envelope

Buttons dispatch `mobiius-command`:

```json
{
  "type": "hud.command",
  "buttonId": "hud.share",
  "capabilityId": "share.dispatch",
  "conceptId": "share",
  "contextId": "partychain",
  "verb": "SHARE",
  "inverse": false,
  "payload": {},
  "receipt": {
    "type": "share.transition.receipt",
    "emittedAt": "ISO-8601"
  }
}
```

Adapters consume the command after routing. Buttons never call Gmail, MCP, Airtable, n8n, or another connector directly.

## Included contexts

- PartyChain
- Origami OS
- Fleet Academy
- CatLabs Studio
- AET FieldStream
- Maker’s Journal
- Voice Bridge
- Shared Project

## Accessibility

- keyboard-operable native buttons;
- short labels selected to fit the available width;
- full synonym and antonym sets in the tooltip;
- large one-hand mode;
- ASK state shown with a slow pulse;
- blocked capabilities omitted from the surface.
