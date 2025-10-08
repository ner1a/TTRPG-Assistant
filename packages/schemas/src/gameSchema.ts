import * as mongoose from "mongoose";

export const GameSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visibility: { type: String, enum: ["private", "party", "public"], required: true },
  system: { type: String, enum: ["Generic", "DND5E", "Daggerheart", "PF2"], required: true },
  title: { type: String, required: true },
  description: { type: String },
  partyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
