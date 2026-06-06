# Feature Brainstorm

Current state: 12 experiences, local ratings/notes stored in browser, no auth, no backend.

---

## Guided Paths

**Couples path**
- A structured sequence of experiences designed to be worked through together over time — ordered by tier (solo-start → better with a partner → partner only) to build a shared vocabulary before going deeper
- "Start here" recommendation based on a short intake: new to exploration, some experience, or seasoned

**Singles path**
- Solo-only sequence with reflection prompts between experiences — leans into the self-knowledge angle, not positioned as a stepping stone to partner work
- Could include journaling nudges: "What did you expect? What surprised you?"

**Reconnection path (couples)**
- A shorter 3–5 experience track for established couples who want to restart curiosity — framed as rediscovery rather than first-time exploration

**Category-specific paths**
- Sensation-focused track (all sensation-led experiences in a logical order)
- Dynamic/power track (all dynamic-led experiences)
- User can pick a track and the UI guides them through it one experience at a time

---

## Dashboard / Profile

**Progress overview**
- How many experiences tried (solo / partner), how many rated, how many still to explore
- Visual breakdown: ✗ / ? / ✓ / ✓✓ distribution across all experiences and rating types

**Pattern insights**
- "You tend to rate giver roles higher than receiver" — surface the patterns the user might not notice themselves
- Sensation-led vs. dynamic-led preference score based on ratings
- Solo vs. partner preference emerging from ratings

**Timeline / history**
- When each experience was tried (if dates are recorded), so you can see your own arc over time

**Compatibility view (couples)**
- If two people both use the app, they can optionally compare ratings — show overlaps (both ✓✓), divergences (one ✓✓, one ✗), and unexplored territory
- Could be done without a backend: export a profile token, partner imports it, comparison is done locally

---

## Auth / Privacy

**Local-only (current state)**
- Data stays in localStorage — private by default, lost if browser data is cleared
- Add an export/import JSON option so users can back up their data or move between devices

**Optional account (lightweight)**
- Email + passphrase, no social login — keeps the private/anonymous feel
- Syncs ratings, notes, and progress across devices
- No names, no profile photos — just a passphrase-protected data store

**Passphrase-locked local vault**
- No server at all — encrypt localStorage data with a user-chosen passphrase
- Data stays local and encrypted, still portable via export/import
- Middle ground between full local and full cloud

**Partner linking (optional)**
- Two accounts can link for the compatibility view
- Only shares what both users explicitly choose to share (specific ratings, or just the aggregate profile)

---

## Suggestion Engine

**Based on your ratings**
- "You rated restraint ✓✓ as receiver — here are experiences that often appeal to people who feel that way"
- Cluster experiences by the psychological mechanism, not just category, so suggestions feel non-obvious

**Gap analysis**
- Experiences you haven't tried in a category you've rated positively — "You like dynamic-led experiences but haven't tried X"

**Next experience recommendation**
- Single prominent "try this next" suggestion on the dashboard, with a brief reason why

**Partner-readiness check**
- If both partners have solo ratings, suggest experiences where solo ratings suggest compatibility before committing to the partner version

---

## Content / Experience Layer

**More experiences**
- Currently 12 — the writing guide is ready, so adding more is a content task
- Could open a submission flow: users suggest experiences, maintainer reviews and publishes

**Intensity / progression tagging**
- Tag each experience as entry / intermediate / advanced so paths can respect a learner curve
- Currently the tier system (solo/partner) is the only progression axis — intensity is a second axis

**Related experiences**
- On each experience page: "If you liked this, the mechanism is similar to X" or "The next step up from this is Y"

**Audio version of instructions**
- Read-aloud mode for the solo and partner instructions — removes the phone-on-bedside-table friction

**Printable / shareable experience card**
- Clean single-page PDF of an experience's instructions and reflection prompts — useful for couples who want a physical prompt without the phone in the room

---

## Social / Community (optional, careful)

**Anonymous aggregate data**
- If opt-in accounts exist: show anonymised aggregate ratings ("73% of people rated this ✓ or ✓✓ as receiver")
- Adds a "you're not alone" signal without exposing individual data

**Discussion (high trust cost)**
- Community forum or comments per experience — genuinely high moderation burden, probably not worth it for a small project
- Alternative: curated "what people notice" quotes per experience, sourced and edited by maintainer

---

## UX / Polish

**Onboarding**
- Short guided intro for first-time visitors: what the guide is, what it isn't, how the rating system works, consent note — before they hit the experience list

**Dark mode**
- If not already present

**Progress persistence warning**
- Clear communication that data is local and how to back it up — many users won't expect browser data to be ephemeral

**Mobile-first experience view**
- The experience pages are probably read on a phone mid-session — optimise for one-handed scrolling, large tap targets on the rating widget

**Offline support (PWA)**
- Service worker so the guide works without a connection — relevant if someone is using it without wifi

---

## Things to decide before building

- Do you want a backend at all, or stay fully client-side?
- Is the couples compatibility feature worth the UX complexity it introduces?
- How many more experiences before the content set feels complete?
- Is the suggestion engine rule-based (cheap, transparent) or ML-based (overkill for this scale)?
