import type { User } from "../index.ts";
import type { Visibility } from "../index.ts";

export interface Character {
  _id: string;
  ownerId: User['_id'];
  name: string;
  class?: string;
  level?: number;
  background?: string;
  story?: string;
  origin?: string;
  visibility: Visibility;
  createdAt: string;
  updatedAt: string;

/* 
  // DND5E specific fields
  dndLevel?: number;
  dndRace?: string;
  dndAlignment?: string;
  dndExperiencePoints?: number;
  dndStrength?: number;
  dndDexterity?: number;
  dndConstitution?: number;
  dndIntelligence?: number;
  dndWisdom?: number;
  dndCharisma?: number;

  // Daggerheart specific fields
  dhAncestry?: string;
  dhCommunity?: string;
  dhLevel?: number;
  dhAgility?: number;
  dhStrength?: number;
  dhFinesse?: number;
  dhInstinct?: number;
  dhPresence?: number;
  dhKnowledge?: number; */
}