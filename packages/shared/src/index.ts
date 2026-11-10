export const VOTING_CARDS = [
  '0',
  '½',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
  '?',
  '☕',
] as const;

export type VoteValue = (typeof VOTING_CARDS)[number];
