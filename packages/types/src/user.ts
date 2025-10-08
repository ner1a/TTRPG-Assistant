import type { Game, Character } from "../index.ts";

export interface User {
  _id: string;
  email: string;
  username: string;
  fullname?: string;
  avatar?: URL;
  games?: Game['_id'][];
  characters?: Character['_id'][];
  membership: {
    membershipType: 'free' | 'silver' | 'gold' | 'party';
    validUntil: Date | null;
  };
  createdAt: Date;
  updatedAt: Date;
}
