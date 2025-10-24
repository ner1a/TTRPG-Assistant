import type { Character } from "../index.ts";

export interface Party {
  _id: string;
  ownerId:string;
  name: string;
  characters?: Character['_id'][];
  description?: string;
  createdAt: string;
  updatedAt: string;
}