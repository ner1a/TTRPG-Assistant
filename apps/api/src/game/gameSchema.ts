import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Game {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  ownerId: mongoose.Types.ObjectId;

  @Prop({ required: true, default: 'private' })
  visibility: 'private' | 'party' | 'public';

  @Prop({ required: true, default: 'Generic' })
  system: 'Generic' | 'DnD5e' | 'Daggerheart' | 'PF2';

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId}], ref: 'Party'})
  parties: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now, required: true })
  updatedAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
