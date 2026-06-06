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
import massage from './experiences/massage.json';
import slowKissing from './experiences/slow-kissing.json';
import eyeContact from './experiences/eye-contact.json';
import praise from './experiences/praise.json';
import edging from './experiences/edging.json';
import nipplePlay from './experiences/nipple-play.json';
import neckKissing from './experiences/neck-kissing.json';
import teasingAndDenial from './experiences/teasing-and-denial.json';
import dirtyTalk from './experiences/dirty-talk.json';
import beingWatched from './experiences/being-watched.json';
import tickling from './experiences/tickling.json';
import silence from './experiences/silence.json';
import pressureAndWeight from './experiences/pressure-and-weight.json';
import confessingFantasies from './experiences/confessing-fantasies.json';
import showeringTogether from './experiences/showering-together.json';
import earPlay from './experiences/ear-play.json';
import vibration from './experiences/vibration.json';
import nudityAsymmetry from './experiences/nudity-asymmetry.json';
import begging from './experiences/begging.json';
import mutualMasturbation from './experiences/mutual-masturbation.json';
import pinching from './experiences/pinching.json';
import rolePlayBasic from './experiences/role-play-basic.json';
import breathControlLight from './experiences/breath-control-light.json';
import smellAndScent from './experiences/smell-and-scent.json';
import mirror from './experiences/mirror.json';
import degradationLight from './experiences/degradation-light.json';
import aftercare from './experiences/aftercare.json';
import dryHumping from './experiences/dry-humping.json';
import kissingWithoutHands from './experiences/kissing-without-hands.json';
import externalAnalMassageSolo from './experiences/external-anal-massage-solo.json';
import cupping from './experiences/cupping.json';
import fullBodySkinContact from './experiences/full-body-skin-contact.json';
import collars from './experiences/collars.json';
import orgasmControl from './experiences/orgasm-control.json';
import sexting from './experiences/sexting.json';
import bodyWorship from './experiences/body-worship.json';
import genitalMassage from './experiences/genital-massage.json';
import humiliationLight from './experiences/humiliation-light.json';
import lingerie from './experiences/lingerie.json';
import degradationOfSpace from './experiences/degradation-of-space.json';
import scalpMassage from './experiences/scalp-massage.json';
import ruinedOrgasm from './experiences/ruined-orgasm.json';
import oralFixation from './experiences/oral-fixation.json';
import talkingAboutIt from './experiences/talking-about-it.json';
import scheduledSex from './experiences/scheduled-sex.json';
import massageWithOil from './experiences/massage-with-oil.json';
import consensualNonConsentLight from './experiences/consensual-non-consent-light.json';
import silkAndSatin from './experiences/silk-and-satin.json';
import cunnilingusfellatioFocus from './experiences/cunnilingus-fellatio-focus.json';
import foodPlay from './experiences/food-play.json';

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

// Optional field on experience JSON objects.
// Absent/null = anatomy-neutral (shown for all filters).
// "penis"  = requires penis anatomy (hidden when filter is "has-vulva")
// "vulva"  = requires vulva anatomy (hidden when filter is "has-penis")
export const ANATOMY_FILTER_OPTIONS = [
  { value: 'all',       label: 'All' },
  { value: 'has-penis', label: 'Has penis' },
  { value: 'has-vulva', label: 'Has vulva' },
];

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
  massage,
  slowKissing,
  eyeContact,
  praise,
  edging,
  nipplePlay,
  neckKissing,
  teasingAndDenial,
  dirtyTalk,
  beingWatched,
  tickling,
  silence,
  pressureAndWeight,
  confessingFantasies,
  showeringTogether,
  earPlay,
  vibration,
  nudityAsymmetry,
  begging,
  mutualMasturbation,
  pinching,
  rolePlayBasic,
  breathControlLight,
  smellAndScent,
  mirror,
  degradationLight,
  aftercare,
  dryHumping,
  kissingWithoutHands,
  externalAnalMassageSolo,
  cupping,
  fullBodySkinContact,
  collars,
  orgasmControl,
  sexting,
  bodyWorship,
  genitalMassage,
  humiliationLight,
  lingerie,
  degradationOfSpace,
  scalpMassage,
  ruinedOrgasm,
  oralFixation,
  talkingAboutIt,
  scheduledSex,
  massageWithOil,
  consensualNonConsentLight,
  silkAndSatin,
  cunnilingusfellatioFocus,
  foodPlay,
];
