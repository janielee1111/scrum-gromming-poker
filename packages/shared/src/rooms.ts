import type { DeckType } from './decks';

export const ROLES = ['voter', 'observer'] as const;
export type Role = (typeof ROLES)[number];

export const ERROR_CODES = [
  'VALIDATION',
  'ROOM_NOT_FOUND',
  'INVALID_INVITE',
  'ROOM_FULL',
] as const;
export type ErrorCode = (typeof ERROR_CODES)[number];

export const LIMITS = {
  roomNameMax: 40,
  participantNameMax: 30,
  participantsMax: 7,
} as const;

export interface CreateRoomRequest {
  name: string;
  deck: DeckType;
}

export interface CreateRoomResponse {
  code: string;
  inviteToken: string;
  facilitatorKey: string;
}

export interface Participant {
  id: string;
  name: string;
  role: Role;
  online: boolean;
}

export interface Room {
  code: string;
  name: string;
  deck: DeckType;
  participants: Participant[];
}
