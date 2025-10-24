import type { User, Party, Character, Visibility } from "../index.ts";

export interface Game {
  _id: string;
  ownerId: User['_id'];
  visibility: Visibility;
  system: "Generic" | "DND5E" | "Daggerheart" | "PF2";
  title: string;
  description?: string;
  parties?: Party['_id'][];
  createdAt: string;
  updatedAt: string;
}