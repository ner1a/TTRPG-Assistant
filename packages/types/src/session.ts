import { Visibility } from "../index.js";

export interface Session {
  _id: string;
  name: string;
  gameId: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  visibility: Visibility
}