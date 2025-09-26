export type Visibility = "private" | "party" | "public";

export interface User {
  _id: string;
  email: string;
  username: string;
  avatar?: string;
  games?: Game['_id'][];
  characters?: Character['_id'][];
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  _id: string;
  title: string;
  system: "Generic" | "DND5E" | "Daggerheart" | "PF2";
  description?: string;
  ownerId: User['_id'];
  partyId?: Party['_id'];
  characters?: Character['_id'][];
  visibility: Visibility;
  createdAt: string;
}

export interface Session {
  _id: string;
  name: string;
  notes?: string;
  gameId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Party {
  _id: string;
  name: string;
  description?: string;
  members: User['_id'][];
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  _id: string;
  name: string;
  ownerId: User['_id'];
  class?: string;
  level?: number;
  background?: string;
  createdAt: string;
  updatedAt: string;

  // DND5E specific fields
  race?: string;
  alignment?: string;
  experiencePoints?: number;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}