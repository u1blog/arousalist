export const TIER_INFO = {
  'solo-start': {
    icon: '🧍',
    label: 'Solo start',
    hint: 'Try this alone first to understand your baseline response',
  },
  'better-with-partner': {
    icon: '🧍→👫',
    label: 'Better with a partner',
    hint: 'The solo version is useful groundwork, but a partner unlocks the real experience',
  },
  'partner-only': {
    icon: '👫',
    label: 'Partner only',
    hint: "The dynamic between two people is the point — doesn't really work alone",
  },
};

export const CATEGORY_INFO = {
  sensation: { label: 'Sensation-led' },
  dynamic:   { label: 'Dynamic-led' },
};

export const RATING_OPTIONS = [
  { value: 'no',       symbol: '✗',  label: 'Not for me' },
  { value: 'curious',  symbol: '?',  label: 'Curious — would try again' },
  { value: 'yes',      symbol: '✓',  label: 'Yes — I liked this' },
  { value: 'yes-plus', symbol: '✓✓', label: 'Yes — I really liked this' },
];

export const RATING_LABELS = {
  solo:     'Solo',
  partner:  'With a partner',
  receiver: 'As receiver',
  giver:    'As giver',
};

export const EXPERIENCES = [
  {
    id: 'temperature-play',
    number: 1,
    title: 'Temperature Play',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'Explore how your body responds to warmth and cold — and how unpredictability transforms the experience with a partner.',
    ratingTypes: ['solo', 'partner'],
    equipment: 'Ice cubes, a glass of warm (not hot) water, a metal spoon, a blindfold',
    safetyNote: null,
    instructions: [
      {
        type: 'solo',
        label: 'Solo first',
        content: "Rest a warm spoon along your inner arm, then an ice cube on the same spot. Alternate. You're just checking whether you have a basic response to temperature contrast — whether it does anything for you at all.",
      },
      {
        type: 'partner',
        label: 'With a partner (the real version)',
        content: "Blindfold the receiver. The giver now chooses warm or cold without announcing which — moving unpredictably across the body, varying the pace. The receiver has no idea what's coming, or where, or when. This is a completely different experience to the solo version. The anticipation between touches, the small shock of not knowing — that's where the charge is.",
      },
    ],
    explore: [
      'Solo: do you prefer warmth or cold? Does your body respond at all?',
      "With a partner: does not knowing what's coming change the intensity?",
      'Are there parts of the body where the surprise lands harder?',
    ],
    why: "Temperature bypasses mental filters instantly — the body responds before the brain does. Cold creates sharp alertness; warmth produces something more yielding. The contrast between the two, especially when unexpected, can feel almost disorienting in a pleasurable way. With a partner controlling it, you surrender the ability to predict, and that surrender is often where the real interest lies.",
  },

  {
    id: 'texture-sensation-play',
    number: 2,
    title: 'Texture and Sensation Play',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'Map your responses to different materials and textures, from soft silk to rough burlap, across different areas of your body.',
    ratingTypes: ['solo', 'partner'],
    equipment: 'Soft fabric (silk, satin), rough fabric (burlap, denim), a feather or soft makeup brush, fingernails, a blindfold',
    safetyNote: null,
    instructions: [
      {
        type: 'solo',
        label: 'Solo first',
        content: "Drag each material across your inner arm, back of neck, stomach, feet, scalp. Vary pressure from barely-touching to firm. You're mapping your own responses — which textures produce something, which don't, which body parts are more sensitive than you expected.",
      },
      {
        type: 'partner',
        label: 'With a partner (the real version)',
        content: "Receiver is blindfolded. Giver moves through textures and body areas without pattern or announcement. Now the receiver doesn't know what material is coming, which part of the body will be touched next, or how firmly. The brain, unable to predict, stays completely present. Every touch lands differently.",
      },
    ],
    explore: [
      'Solo: which textures feel good, irritating, or interesting?',
      'With a partner: does unpredictability change how each texture feels?',
      'Are there areas of your body that are more sensitive than you knew?',
    ],
    why: "Most of us spend our days in uniform clothing and rarely pay attention to what touch actually feels like. A rough texture dragged across skin can feel grounding and primal; something very soft can feel almost unbearably tender. People are consistently surprised by strong preferences they didn't know they had — and the partner version tends to surface them faster.",
  },

  {
    id: 'sensory-deprivation-sight',
    number: 3,
    title: 'Sensory Deprivation — Sight',
    tier: 'solo-start',
    category: 'sensation',
    description: 'Discover what happens when you remove sight from the equation — whether the darkness feels calming, anxiety-inducing, or something else entirely.',
    ratingTypes: ['solo'],
    equipment: 'A sleep mask, scarf, or any light-blocking fabric',
    safetyNote: null,
    instructions: [
      {
        type: 'single',
        label: 'Solo',
        content: "Put on the blindfold and sit or lie still for a few minutes. Pay attention to what you can hear, smell, and feel without sight. Touch different surfaces and objects around you — notice how different they feel without visual context. Notice whether the absence of sight feels calming, anxiety-inducing, or something else.",
      },
    ],
    explore: [
      'Does removing sight feel relaxing or uncomfortable?',
      'Do your other senses feel heightened?',
      "Is there something appealing about not knowing what's around you?",
    ],
    why: "The blindfold is one of the gentlest entries into surrendering control. Without sight, the brain gives up one of its primary tools for predicting what's coming next. For some people this is immediately calming — almost meditative. For others, the heightened anticipation is what's exciting. Either response is genuinely informative. Note: this experience is most powerful when combined with a partner (see Sensation Play or Restraint) — on its own, it's more of a diagnostic than a destination.",
  },

  {
    id: 'impact-play',
    number: 4,
    title: 'Impact Play',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'From light self-testing to the full partner dynamic, explore whether impact produces a response worth pursuing.',
    ratingTypes: ['solo', 'receiver', 'giver'],
    equipment: 'Just your hands to start; optionally a ruler, wooden spoon, or folded belt',
    safetyNote: null,
    instructions: [
      {
        type: 'solo',
        label: 'Solo first',
        content: "Light open-hand slaps on your outer thigh, varying from very light to moderate. If using an implement, test it on your palm first to understand the sensation, then your thigh. You're checking: does impact produce any response you find interesting, or does it just hurt?",
      },
      {
        type: 'partner',
        label: 'With a partner (the real version)',
        content: "Self-impact has a hard ceiling — you instinctively pull the strike, you know exactly when it's coming, and the dynamic element is completely absent. The full experience of impact play involves someone else delivering it: the unpredictability of timing, the difference between someone else's force and your own, and the relational quality of one person choosing to strike and another choosing to receive. Even hand spanking from a partner is a categorically different experience.",
      },
    ],
    explore: [
      'Solo: does impact produce any sensation you find interesting, even mildly?',
      "With a partner: does the unpredictability of timing change things?",
      'Thuddy (cupped hand, deeper impact) vs. stinging (flat hand, sharp surface) — which do you prefer?',
      'How does it feel to be the one delivering vs. receiving?',
    ],
    why: "Impact activates the body's endorphin and adrenaline response. Even mild impact can produce a flush of sensation that many people find focusing or oddly calming after the initial sting. Some describe it as a \"reset\" — a way of landing very firmly in the body. The dynamic between giver and receiver adds a layer that many people find just as significant as the physical sensation.",
  },

  {
    id: 'restraint',
    number: 5,
    title: 'Restraint',
    tier: 'better-with-partner',
    category: 'dynamic',
    description: 'Even symbolic restriction changes mental state — discover what letting go of movement does to your mind.',
    ratingTypes: ['solo', 'receiver', 'giver'],
    equipment: 'A scarf, soft tie, or belt — or just a partner\'s hands',
    safetyNote: null,
    instructions: [
      {
        type: 'solo',
        label: 'Solo first',
        content: "Loosely tie your own wrists together, just snug enough to feel. Lie back with them above your head for a few minutes. You can escape instantly — but notice what the restriction does to your mental state, even symbolically. Do you find it interesting or just pointless?",
      },
      {
        type: 'partner',
        label: 'With a partner (the real version)',
        content: "Having someone else hold your wrists down — even just with their hands, no equipment at all — is a completely different experience. You could break free but you're choosing not to. The restriction is real. The other person's attention is entirely on you. This is where the psychological dimension of restraint actually lives. If that's interesting, progress to a loosely tied scarf. Try different positions: wrists above head lying down, sitting with hands held behind you.",
      },
    ],
    explore: [
      'Solo: does even symbolic restriction produce anything — calm, restlessness, curiosity?',
      'With a partner: does being held still feel relaxing, exciting, or uncomfortable?',
      'Is it the physical sensation or the psychological dynamic that\'s doing the work?',
      'How does it feel to be the one doing the holding?',
    ],
    why: "Restraint removes the option to act, and for many people that removal is unexpectedly freeing. There's nothing to do but feel. The mind, usually planning ahead or managing the situation, has nowhere to go. For the person doing the restraining, there's a quality of total focused responsibility — you are entirely in charge of this person's experience right now — that many find deeply engaging.",
  },

  {
    id: 'candle-wax',
    number: 6,
    title: 'Candle Wax',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'Temperature, light impact, and visual ritual combine in this multi-sensory experience.',
    ratingTypes: ['solo', 'partner'],
    equipment: 'A plain white household candle (not scented, not coloured — these burn hotter), lighter, something to protect the floor',
    safetyNote: 'Plain white candles have the lowest burn temperature. Hold at least 45cm above skin — wax cools significantly as it falls. Never use near the face. Have cool water nearby. Test on your outer thigh first.',
    instructions: [
      {
        type: 'solo',
        label: 'Solo first',
        content: "Light the candle, let a small pool form, and drip a few drops onto your outer thigh from 45–60cm up. You're checking whether the brief heat followed by cooling wax produces any response worth exploring.",
      },
      {
        type: 'partner',
        label: 'With a partner (the real version)',
        content: "Lie back, blindfolded. The giver controls the candle — varying the height (higher = cooler by landing), the pace, and the location. You don't know where the next drop will fall. That anticipation — the flicker of the flame, the sound of the wax, the not-knowing — is most of the experience.",
      },
    ],
    explore: [
      'Solo: is the sensation interesting or just uncomfortable?',
      "With a partner: does not knowing where the next drop lands change things?",
      'Is there something about the ritual quality — candle, warmth, wax hardening on skin — that appeals?',
    ],
    why: "Wax play sits at the intersection of temperature, light impact, and visual ritual. The experience is multi-sensory — the smell of the wax, the warmth, the brief sting, the hardening on skin. The partner version adds spatial unpredictability on top. Many people find it oddly grounding and meditative; others are more drawn to the aesthetics and theatre of it.",
  },

  {
    id: 'body-sensitivity-mapping',
    number: 7,
    title: 'Body Sensitivity Mapping',
    tier: 'better-with-partner',
    category: 'sensation',
    description: "A systematic tour of your body's actual sensitivity — the results are often genuinely surprising.",
    ratingTypes: ['solo', 'partner'],
    equipment: 'A soft brush, fingernails, ice, a textured cloth',
    safetyNote: null,
    instructions: [
      {
        type: 'solo',
        label: 'Solo first',
        content: "Work systematically across your body — feet (sole, arch, toes, top), calves, inner thighs, stomach, chest, back of neck, scalp, inner arms, behind the knees. Apply the same stimulus to each area and notice the response. You're building a map of your own sensitivity.",
      },
      {
        type: 'partner',
        label: 'With a partner (the real version)',
        content: "Receiver is blindfolded. Giver moves through areas and stimuli without pattern. The receiver loses track of where the giver is, and where they'll go next. Touches arrive as surprises. Body parts you'd normally dismiss as unremarkable can suddenly produce strong responses when you're not bracing for them.",
      },
    ],
    explore: [
      'Solo: which areas are more sensitive than you expected?',
      'Do your feet produce a strong response — ticklish, pleasurable, uncomfortable, or interesting?',
      'With a partner: does losing track of where the touch is coming from change how it feels?',
    ],
    why: "Most people have never done a systematic tour of their own body's sensitivity. The results are often surprising — areas assumed to be neutral turn out to be quite responsive; areas assumed to be erogenous zones matter less than expected. Feet in particular are interesting: densely nerve-mapped, culturally loaded, and producing responses from strong aversion to genuine pleasure. This experience gives you real self-knowledge.",
  },

  {
    id: 'hair-pulling',
    number: 8,
    title: 'Hair Pulling',
    tier: 'partner-only',
    category: 'dynamic',
    description: "Positional and sensory at once — controlling someone's head position is often as significant as the scalp sensation itself.",
    ratingTypes: ['receiver', 'giver'],
    equipment: 'Just hands.',
    safetyNote: null,
    instructions: [
      {
        type: 'single',
        label: 'With a partner',
        content: "Gather a good handful of hair close to the scalp — pulling from the ends is uncomfortable and damages hair; pulling from the root is the sensation. Apply slow, steady upward or backward tension — not a jerk. Vary the pressure from very light (just feeling the roots engage) to more assertive. Try combining with restraint — head pulled back, neck exposed.",
      },
    ],
    explore: [
      'Does scalp tension feel pleasant, unpleasant, or interesting?',
      "Is the vulnerability of having your head's position controlled part of the appeal?",
      'Does slow, sustained tension feel different to a quick pull?',
      'How does the giver feel about directing someone\'s position this way?',
    ],
    why: "Hair pulling is positional as much as sensory — whoever holds the hair guides where the head goes. That directional, controlling quality is what many people respond to, often more than the scalp sensation itself. It's a compact act of dominance and submission that requires no equipment and no planning. The neck, once exposed, also becomes suddenly accessible — which is rarely accidental.",
  },

  {
    id: 'scratching',
    number: 9,
    title: 'Scratching',
    tier: 'partner-only',
    category: 'sensation',
    description: "There's a zone where pleasure and pain become genuinely hard to distinguish — fingernails navigate it well.",
    ratingTypes: ['receiver', 'giver'],
    equipment: 'Just fingernails.',
    safetyNote: null,
    instructions: [
      {
        type: 'single',
        label: 'With a partner',
        content: "Start with very light dragging of fingernails across the back and shoulders. Build gradually to a firm drag that leaves a light pink line. Try long slow strokes vs. shorter repeated patterns. Try the back, shoulders, inner arms, and inner thighs.",
      },
    ],
    explore: [
      'At what pressure does it shift from pleasant to uncomfortable?',
      'Are there particular areas where it feels especially good?',
      'Does the temporary marking (redness, lines) feel meaningful or neutral?',
    ],
    why: "Scratching sits in a zone between pleasure and pain where the nervous system seems genuinely uncertain how to categorise the signal. Many people find moderate scratching deeply satisfying in a way that's hard to articulate — somewhere between relief and stimulation. Some are also drawn to the temporary marks left behind, which carry their own psychological weight: visible evidence of intensity that fades in an hour.",
  },

  {
    id: 'biting',
    number: 10,
    title: 'Biting',
    tier: 'partner-only',
    category: 'sensation',
    description: 'Primal, immediate, and grounding — biting carries strong associations of presence, intensity, and claiming.',
    ratingTypes: ['receiver', 'giver'],
    equipment: 'Just yourselves.',
    safetyNote: null,
    instructions: [
      {
        type: 'single',
        label: 'With a partner',
        content: "Start with very soft bites — more pressure than a kiss, less than you'd think of as actually biting. Good starting areas: shoulder, back of neck, inner arm, earlobe. Build pressure gradually, watching the receiver's response and checking in. A bite that leaves brief redness but no bruise is roughly the moderate zone. Avoid bony areas (spine, collarbone, ribs).",
      },
    ],
    explore: [
      'Is there a threshold where it shifts from pleasurable to just painful?',
      'Which parts of the body respond best?',
      'Is there something that appeals about the primal, claiming quality of it?',
    ],
    why: "Biting carries strong primal associations — it's an act of presence, intensity, claiming. Many people find it grounds them in the moment more immediately than almost anything else. The neck and shoulder are particularly rich with nerve endings, and the combination of pressure, warmth, and mild pain produces a response that people often find difficult to describe but immediately want again.",
  },

  {
    id: 'foot-worship-massage',
    number: 11,
    title: 'Foot Worship and Massage',
    tier: 'partner-only',
    category: 'dynamic',
    description: 'Often as much about the dynamic of wholehearted, focused service as the sensation itself.',
    ratingTypes: ['receiver', 'giver'],
    equipment: 'Just yourselves; optionally massage oil.',
    safetyNote: null,
    instructions: [
      {
        type: 'single',
        label: 'With a partner',
        content: "Receiver lies back, feet accessible to the giver. Begin with a straightforward firm massage — sole, arch, heel, each toe. Gradually introduce more varied contact: fingernails lightly dragged across the sole, pressing between toes, kisses on the top of the foot. Move up to ankles and calves. Both partners should pay attention to their own responses — this one is often as interesting to observe from the giving side as the receiving side.",
      },
    ],
    explore: [
      'Does the receiver find foot attention relaxing, pleasurable, ticklish, or uncomfortable?',
      'Does the intention and focus of the giver change how it feels to receive?',
      'How does the giver feel about being in a position of attentive service?',
    ],
    why: "Foot worship is often misread as being purely about feet. It's frequently as much about the dynamic — one person in a position of wholehearted, focused service to another. For receivers, having feet treated with genuine attention feels surprisingly intimate and grounding. For givers drawn to this, there's often something deeply satisfying about the completeness of the act: you are entirely focused on one thing, for one person.",
  },

  {
    id: 'power-dynamics',
    number: 12,
    title: 'Power Dynamics: Instructions and Compliance',
    tier: 'partner-only',
    category: 'dynamic',
    description: 'No equipment needed — just two people and an agreed structure. Discover whether giving or following instructions produces something real.',
    ratingTypes: ['receiver', 'giver'],
    equipment: 'Nothing except an agreed setup.',
    safetyNote: null,
    instructions: [
      {
        type: 'single',
        label: 'With a partner',
        content: "Agree that for 10–15 minutes, one partner gives simple instructions and the other follows them. Keep it physical and simple: \"sit here,\" \"don't move,\" \"look at me,\" \"turn around,\" \"stay still.\" The giver should be calm and deliberate — this is about presence, not bossiness. The receiver's job is to notice what following instructions actually feels like.",
      },
    ],
    explore: [
      'Does giving instructions feel natural, uncomfortable, or interesting?',
      "Does following them feel frustrating, relaxing, or something else?",
      "Is there a clear preference for which role you'd rather be in?",
    ],
    why: "No props, pure dynamic. Many people discover a strong role preference through this exercise that they hadn't consciously identified. Givers often find that genuine calm authority is harder to sustain than expected — and more satisfying when they manage it. Receivers often find that full compliance, even in small mundane things, produces an unexpected quieting of the mind. The responsibility is temporarily lifted. There's nothing to decide.",
  },
];
