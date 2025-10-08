import type { User } from "../index.ts";

export interface Party {
  _id: string;
  name: string;
  members: User['_id'][];
  description?: string;
  createdAt: string;
  updatedAt: string;
}