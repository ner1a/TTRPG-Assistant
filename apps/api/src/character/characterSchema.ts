import * as mongoose from "mongoose";

export const CharacterSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  class: { type: String },
  level: { type: Number, default: 1 },
  background: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // DND5E specific fields
  dndLevel: { type: Number, default: 1 },
  dndRace: { type: String },
  dndAlignment: { type: String },
  dndExperiencePoints: { type: Number, default: 0 },
  dndStrength: { type: Number, default: 8 },
  dndDexterity: { type: Number, default: 8 },
  dndConstitution: { type: Number, default: 8 },
  dndIntelligence: { type: Number, default: 8 },
  dndWisdom: { type: Number, default: 8 },
  dndCharisma: { type: Number, default: 8 },

  // Daggerheart specific fields
  dhAncestry: { type: String },
  dhCommunity: { type: String },
  dhLevel: { type: Number, default: 1 },
  dhAgility: { type: Number, default: 0 },
  dhStrength: { type: Number, default: 0 },
  dhFinesse: { type: Number, default: 0 },
  dhInstinct: { type: Number, default: 0 },
  dhPresence: { type: Number, default: 0 },
  dhKnowledge: { type: Number, default: 0 },
});
