# Experience Writing Guide

A reference for anyone contributing a new experience to this guide. Read this before you write. The goal is experiences that feel at home alongside the existing twelve — same voice, same rigour, same respect for the reader.

---

## What an experience is (and isn't)

An experience is a structured first encounter with a particular dynamic or sensation — designed for someone who hasn't tried it, written to help them find out if it's for them. It is not:

- A how-to manual for advanced practitioners
- A tutorial that assumes the reader already knows they like this
- A sales pitch for the experience
- A judgment-free caveat list

The reader is curious, probably a little uncertain, and intelligent. Write for them.

---

## Required fields

Every experience must have all of the following. No exceptions.

### `id`
Sequential number, zero-padded to two digits. Check existing entries and increment.

### `title`
Short (2–4 words). Specific enough to be unambiguous, plain enough that a first-timer isn't put off. Avoid clinical jargon and slang equally. Examples: *Temperature Play*, *Hair Pulling*, *Restraint*.

### `tier`
One of three values, assigned by the criteria below:

| Tier | Criteria |
|------|----------|
| `Solo start` | Can be done alone and produces genuinely useful information on its own — not just a pale shadow of the partner version. |
| `Better with a partner` | Has meaningful solo instructions, but the partner version is the real version. Use when the solo try is a useful diagnostic but the experience only fully exists with two people. |
| `Partner only` | No meaningful solo version. Attempting it alone either doesn't work or produces nothing useful. |

If you're unsure between "Better with a partner" and "Partner only," ask: does the solo version tell the reader something real about themselves, or is it just a consolation exercise? If the latter, use Partner only.

### `category`
One of two values:

- `Sensation-led` — the primary interest is physical sensation: texture, temperature, pain, pressure, pleasure. The psychological layer exists but is secondary.
- `Dynamic-led` — the primary interest is the relational dynamic: power, control, service, trust, surrender. The physical sensations exist but are secondary.

Some experiences sit on the boundary. Assign to whichever is the *primary* draw for most people who seek out this experience.

### `description`
One or two sentences. Not a summary of the instructions — a hook that captures what makes this experience distinctive. Write it as if you had ten seconds to tell someone why this is worth trying. Avoid "you will explore..." constructions. Be specific about the quality of the experience, not just the category.

**Weak:** *Explore how your body responds to different types of pressure and contact.*
**Strong:** *There's a zone where pleasure and pain become genuinely hard to distinguish — fingernails navigate it well.*

### `equipment`
A plain list of what's needed. Be specific about what kind (plain white candle, not scented). If something could be improvised, say so. If nothing is needed, write *Just yourselves* or *Just hands.* Never list optional equipment as if it's required.

### `safetyNote`
**Mandatory for any experience involving impact, restraint, heat, sharp edges, or positional stress.** Optional for experiences with no meaningful injury risk.

Keep it short: the one or two things that matter most, stated plainly. Not a legal disclaimer. Not a comprehensive risk inventory. The reader should be able to act on it immediately.

Format: plain prose, no bullet points. Example from Candle Wax: *Plain white candles have the lowest burn temperature. Hold at least 45cm above skin — wax cools significantly as it falls. Never use near the face. Have cool water nearby. Test on your outer thigh first.*

Experiences that require a safety note: anything involving impact (striking, biting, scratching), restraint of any kind, heat, or control of head/neck position. When in doubt, include a brief one.

### `soloInstructions`
Required for all tiers except Partner only. Concrete, specific, physical. Tell the reader exactly what to do. Second person present tense. No hedging, no "you might want to try."

The solo version should tell the reader something real — not just "touch yourself to see if you like it." Give them a specific procedure. They're building self-knowledge, not just killing time.

**Weak:** *Try different temperatures on your skin and notice what you feel.*
**Strong:** *Rest a warm spoon along your inner arm, then an ice cube on the same spot. Alternate. You're just checking whether you have a basic response to temperature contrast — whether it does anything for you at all.*

### `partnerInstructions`
Required for all tiers except Solo start. Write for the *giver* primarily — the person doing the action — since they're the one who needs to know what to do. But make sure the receiver's job is also clear.

**For experiences with clear giver and receiver roles:** explicitly address both. Don't assume one partner will figure out their job. Tell the giver what to do; tell the receiver what to notice.

**Role switching:** if the experience is meaningfully different from giver vs. receiver side (which is true of almost every dynamic-led experience and many sensation-led ones), include an explicit instruction to switch. Something like: *After one round, swap roles. The giver and receiver experiences are different enough that you should try both before drawing conclusions.* This should be in the instructions themselves, not just implied by the rating system.

**Do not write "partner instructions" as if the partner is a prop.** Both people are participants. Both should be paying attention to their own responses.

### `thingsToExplore`
3–5 reflection prompts, written as questions. These are what the reader carries into the experience and thinks about afterward. They should:

- Cover both solo and partner dimensions if applicable
- Address the *giver* experience, not just the receiver's
- Go beyond "did you like it?" — ask about thresholds, comparisons, specific qualities, what surprised them
- At least one question should address the psychological or dynamic dimension, not just physical sensation

**Weak:** *Did you find the experience pleasurable?*
**Strong:** *Is there a clear preference for which role you'd rather be in?*
**Strong:** *Does the temporary marking (redness, lines) feel meaningful or neutral?*

Do not include more than 5. The reader is about to do the thing, not read a questionnaire.

### `whyPeopleLoveThis`
2–4 sentences. This is the most important section after the instructions — get it right.

It should explain the actual mechanism: why does this produce the response it does? What is the body or mind doing? This is not a list of benefits and not a sales pitch. It's an honest account of the real draw, including acknowledging that it won't work for everyone.

**What it's not:**
- A list of generic adjectives (*exciting, intimate, intense*)
- A promise that the reader will enjoy it
- A moral reassurance that the experience is okay

**What it is:**
- A specific psychological or physiological explanation
- Honest about which part is doing the work (sometimes it's the dynamic, not the sensation; say so)
- Written with the intellectual curiosity of someone who finds this genuinely interesting

**Weak:** *Many couples enjoy this experience as a way to deepen intimacy and explore new sensations together.*
**Strong:** *Restraint removes the option to act, and for many people that removal is unexpectedly freeing. There's nothing to do but feel. The mind, usually planning ahead or managing the situation, has nowhere to go.*

### `ratingTypes`
An array of strings specifying which ratings the reader should give. Use only these values:

| Value | When to use |
|-------|-------------|
| `solo` | The experience has a meaningful solo version worth rating |
| `receiver` | There's a distinct receiver role in the partner version |
| `giver` | There's a distinct giver role worth rating separately |
| `partner` | **Do not use.** This is ambiguous. Use `receiver` and/or `giver` instead. |

Most experiences will be `["solo", "receiver", "giver"]` or `["receiver", "giver"]` or just `["solo"]`.

**Why not "partner"?** "Partner" doesn't tell the reader whose experience they're rating — the person receiving or the person giving. Even experiences where the giver role feels secondary (temperature play, candle wax) still have a distinct giver experience worth capturing. Use `receiver` and `giver` consistently.

---

## Voice and tone

Read the existing experiences before writing. The voice has specific qualities:

**Direct.** No hedging, no "you might find that..." Declare what the experience is. If the solo version is limited, say so plainly. If the partner version is categorically different, say that too.

**Non-moralising.** Don't reassure the reader that this is okay, normal, or healthy. They didn't ask. Write as if all curiosity is already assumed to be legitimate.

**Specific over general.** "45cm above skin" is better than "a safe distance." "Outer thigh" is better than "somewhere safe." Give the reader a concrete action, not a principle to interpret.

**Honest about limitations.** If the solo version is just a diagnostic for the partner version, say so. If the experience won't land for everyone and there's something specific that predicts who it'll land for, say that.

**Curious, not clinical.** You're writing for someone who wants to understand their own responses. Match that intellectual register.

---

## What to avoid

**Don't repeat across sections.** If you've explained why the partner version is different in `partnerInstructions`, don't repeat the same point in `whyPeopleLoveThis`.

**Don't overlap with existing experiences.** Before writing, check: is there already an experience that covers this ground? Body Sensitivity Mapping (#07), Temperature Play (#01), and Texture Play (#02) all involve systematic body exploration with a blindfolded receiver. A new experience in this space needs to be meaningfully distinct, not a variation.

**Don't write a tutorial for people who already know they like this.** This is a first-encounter guide. The reader doesn't need advanced technique — they need enough to find out if this is for them at all.

**Don't bury the lead.** The most interesting thing about the experience should appear early — in the description, or in the first sentence of the instructions. Don't save it for "Why People Love This."

**Don't include "always communicate with your partner" as a generic note.** If specific communication is required *before starting* (agree on a signal, agree on intensity level, agree on which role you're starting in), include that concretely in the instructions. Vague consent boilerplate adds noise without adding safety.

---

## Deciding whether to include a new experience

Ask these questions before writing:

1. **Is it meaningfully different from what's already here?** What specific draw or mechanism does it offer that none of the twelve cover?
2. **Can a first-timer do it safely without specialist knowledge?** If not, it's outside the scope of this guide.
3. **Is the first-encounter version genuinely informative?** Some experiences only reveal themselves after significant practice. If the first attempt is mostly just confusing, it may not fit the format.
4. **Is there a real solo or partner-entry version?** The guide is structured as a progression. If the experience has no entry point for beginners, it doesn't fit.

---

## Checklist before submitting

- [ ] All required fields present
- [ ] `ratingTypes` uses `receiver`/`giver` — not `partner`
- [ ] Safety note included if any impact, heat, restraint, or head/neck position involved
- [ ] Solo instructions give a specific procedure, not just a principle
- [ ] Partner instructions address both giver and receiver
- [ ] Role-switch instruction included if giver and receiver experiences are meaningfully different
- [ ] `thingsToExplore` has at least one question about the giver experience
- [ ] `thingsToExplore` has at least one question about the psychological/dynamic dimension
- [ ] `whyPeopleLoveThis` explains a mechanism, not just lists adjectives
- [ ] Voice is direct, specific, and non-moralising
- [ ] No overlap with existing experiences (or overlap is justified)
