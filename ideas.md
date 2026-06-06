# Feature Brainstorm

Current state: 62 experiences, local ratings/notes stored in browser, no auth, no backend.

---

## Session Planner

Plan an evening in advance — pick a set of experiences, order them, then have the app walk you through them one at a time.

**Building a session**
- Browse and add experiences to a session from the experience list (like a playlist)
- Drag to reorder — think about pacing: lighter/sensation-led first, more intense/dynamic-led later
- Give the session a name and optional note ("Tuesday — first time trying restraint")
- Save multiple sessions so you can revisit or reuse a lineup that worked

**The kit list**
- Before you start, the app consolidates equipment from all selected experiences into a single list — one place to gather everything you need
- Deduplicates (if three experiences need a blindfold, it only appears once)
- Could flag conflicts: e.g. if one experience needs a lit candle and another specifically says no open flames

**Session mode (walk-through)**
- Full-screen, distraction-free view — one experience at a time, phone-friendly
- Shows just the instructions for the current experience (solo or partner, depending on your session type)
- Simple "next" to advance, with a progress indicator ("3 of 6")
- Rate and add a note for each experience immediately after, while it's fresh, before moving on
- A "pause session" state so you can step away and resume without losing your place

**After the session**
- Summary screen: all experiences tried that evening, all ratings given
- Prompts a short overall reflection: what was the highlight, what would you change next time
- Session saved to history alongside individual experience records

**Session history**
- List of past sessions with date, experiences included, and overall notes
- Useful for spotting what combinations worked well together

---



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
- Currently 62 — the writing guide is ready, so adding more is a content task
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

## Feedback & Contributions

**Experience feedback**
- A simple per-experience feedback button — "something wrong with these instructions?" or "this felt off" — that opens a short form
- Keeps it low-friction: no account required, just an optional text field and a send button
- Delivery could be a GitHub issue (via API), a form service (Formspree, etc.), or just an email mailto link to keep it fully static
- Distinguish between content feedback (instructions unclear, safety note missing something) and general feedback (I didn't like it) — the former is actionable, the latter isn't

**Suggest a new experience**
- A structured submission form that mirrors the writing guide fields: title, tier, category, description, why you think it belongs here
- Sets expectations upfront — links to the writing guide so submitters understand what's actually needed
- Could be a GitHub issue template (keeps it in the open, lets others +1 suggestions) or a private form if you'd rather curate quietly
- Optionally: a public "requested experiences" list so people can see what's been suggested and vote, avoiding duplicates

**In-app writing guide link**
- The experience-writing-guide.md already exists — surface it in the UI alongside the submission form so contributors can write a full draft rather than just a request

---

## Things to decide before building

- Do you want a backend at all, or stay fully client-side?
- Is the couples compatibility feature worth the UX complexity it introduces?
- How many more experiences before the content set feels complete?
- Is the suggestion engine rule-based (cheap, transparent) or ML-based (overkill for this scale)?
