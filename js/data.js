var EXPERIENCES = [
  {
    id: 'temperature-play',
    number: 1,
    title: 'Temperature Play',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'Explore how your body responds to warmth and cold — and how unpredictability transforms the experience with a partner.',
    ratingTypes: ['solo', 'partner'],
  },
  {
    id: 'texture-sensation-play',
    number: 2,
    title: 'Texture and Sensation Play',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'Map your responses to different materials and textures, from soft silk to rough burlap, across different areas of your body.',
    ratingTypes: ['solo', 'partner'],
  },
  {
    id: 'sensory-deprivation-sight',
    number: 3,
    title: 'Sensory Deprivation — Sight',
    tier: 'solo-start',
    category: 'sensation',
    description: 'Discover what happens when you remove sight from the equation — whether the darkness feels calming, anxiety-inducing, or something else entirely.',
    ratingTypes: ['solo'],
  },
  {
    id: 'impact-play',
    number: 4,
    title: 'Impact Play',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'From light self-testing to the full partner dynamic, explore whether impact produces a response worth pursuing.',
    ratingTypes: ['solo', 'receiver', 'giver'],
  },
  {
    id: 'restraint',
    number: 5,
    title: 'Restraint',
    tier: 'better-with-partner',
    category: 'dynamic',
    description: 'Even symbolic restriction changes mental state — discover what letting go of movement does to your mind.',
    ratingTypes: ['solo', 'receiver', 'giver'],
  },
  {
    id: 'candle-wax',
    number: 6,
    title: 'Candle Wax',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'Temperature, light impact, and visual ritual combine in this multi-sensory experience.',
    ratingTypes: ['solo', 'partner'],
  },
  {
    id: 'body-sensitivity-mapping',
    number: 7,
    title: 'Body Sensitivity Mapping',
    tier: 'better-with-partner',
    category: 'sensation',
    description: 'A systematic tour of your body\'s actual sensitivity — the results are often genuinely surprising.',
    ratingTypes: ['solo', 'partner'],
  },
  {
    id: 'hair-pulling',
    number: 8,
    title: 'Hair Pulling',
    tier: 'partner-only',
    category: 'dynamic',
    description: 'Positional and sensory at once — controlling someone\'s head position is often as significant as the scalp sensation itself.',
    ratingTypes: ['receiver', 'giver'],
  },
  {
    id: 'scratching',
    number: 9,
    title: 'Scratching',
    tier: 'partner-only',
    category: 'sensation',
    description: 'There\'s a zone where pleasure and pain become genuinely hard to distinguish — fingernails navigate it well.',
    ratingTypes: ['receiver', 'giver'],
  },
  {
    id: 'biting',
    number: 10,
    title: 'Biting',
    tier: 'partner-only',
    category: 'sensation',
    description: 'Primal, immediate, and grounding — biting carries strong associations of presence, intensity, and claiming.',
    ratingTypes: ['receiver', 'giver'],
  },
  {
    id: 'foot-worship-massage',
    number: 11,
    title: 'Foot Worship and Massage',
    tier: 'partner-only',
    category: 'dynamic',
    description: 'Often as much about the dynamic of wholehearted, focused service as the sensation itself.',
    ratingTypes: ['receiver', 'giver'],
  },
  {
    id: 'power-dynamics',
    number: 12,
    title: 'Power Dynamics: Instructions and Compliance',
    tier: 'partner-only',
    category: 'dynamic',
    description: 'No equipment needed — just two people and an agreed structure. Discover whether giving or following instructions produces something real.',
    ratingTypes: ['receiver', 'giver'],
  },
];

var TIER_INFO = {
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
    hint: 'The dynamic between two people is the point — doesn\'t really work alone',
  },
};

var CATEGORY_INFO = {
  sensation: { label: 'Sensation-led' },
  dynamic: { label: 'Dynamic-led' },
};

var RATING_LABELS = {
  solo: 'Solo',
  partner: 'With a partner',
  receiver: 'As receiver',
  giver: 'As giver',
};

var RATING_OPTIONS = [
  { value: 'no',       symbol: '✗',  label: 'Not for me' },
  { value: 'curious',  symbol: '?',  label: 'Curious — would try again' },
  { value: 'yes',      symbol: '✓',  label: 'Yes — I liked this' },
  { value: 'yes-plus', symbol: '✓✓', label: 'Yes — I really liked this' },
];
