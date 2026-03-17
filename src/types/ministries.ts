export const MINISTRY_IDS = [
  'worship',
  'daughters-of-faith',
  'sunday-school',
  'micro-churches',
  'house-of-prophets',
  'young-adults',
  'legacy-church',
  'media-team',
  'family-life',
] as const;

export type MinistryId = (typeof MINISTRY_IDS)[number];

