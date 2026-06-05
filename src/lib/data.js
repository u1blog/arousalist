import temperaturePlay from './experiences/temperature-play.json';
import textureSensationPlay from './experiences/texture-sensation-play.json';
import sensoryDeprivationSight from './experiences/sensory-deprivation-sight.json';
import impactPlay from './experiences/impact-play.json';
import restraint from './experiences/restraint.json';
import candleWax from './experiences/candle-wax.json';
import bodySensitivityMapping from './experiences/body-sensitivity-mapping.json';
import hairPulling from './experiences/hair-pulling.json';
import scratching from './experiences/scratching.json';
import biting from './experiences/biting.json';
import footWorshipMassage from './experiences/foot-worship-massage.json';
import powerDynamics from './experiences/power-dynamics.json';

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
  receiver: 'As receiver',
  giver:    'As giver',
};

export const EXPERIENCES = [
  temperaturePlay,
  textureSensationPlay,
  sensoryDeprivationSight,
  impactPlay,
  restraint,
  candleWax,
  bodySensitivityMapping,
  hairPulling,
  scratching,
  biting,
  footWorshipMassage,
  powerDynamics,
];
