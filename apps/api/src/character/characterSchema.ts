import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Character {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  ownerId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  class: string;

  @Prop({ default: 1 })
  level: number;

  @Prop()
  background: string;

  @Prop({required: true, default:'private'})
  visibility: 'private' | 'party' | 'public';

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now, required: true })
  updatedAt: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

// LET CREATE REALM/SYSTEM SCHEMAS AND USE REALM/SYSTEM ID'S

/* // DND5E specific fields
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
  dhKnowledge: { type: Number, default: 0 }, */
