const PSSWD_STRENGTH_NAMES = {
  tooWeak: "Too Weak",
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
};

export const psswdStrengthCfg = [
  {
    id: 0,
    value: PSSWD_STRENGTH_NAMES.tooWeak,
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: PSSWD_STRENGTH_NAMES.weak,
    minDiversity: 0,
    minLength: 8,
  },
  {
    id: 2,
    value: PSSWD_STRENGTH_NAMES.medium,
    minDiversity: 2,
    minLength: 10,
  },
  {
    id: 3,
    value: PSSWD_STRENGTH_NAMES.strong,
    minDiversity: 4,
    minLength: 12,
  },
];

export const getPsswdStrengthColor = (strength: string) => {
  switch (strength) {
    case PSSWD_STRENGTH_NAMES.tooWeak:
      return "#a01";
    case PSSWD_STRENGTH_NAMES.weak:
      return "#841";
    case PSSWD_STRENGTH_NAMES.medium:
      return "#881";
    case PSSWD_STRENGTH_NAMES.strong:
      return "#181";
    default:
      return "#000";
  }
};
