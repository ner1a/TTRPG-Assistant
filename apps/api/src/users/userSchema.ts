import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  fullname: string;
  
  @Prop()
  avatar: URL;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
  games: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] })
  characters: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: {
      membershipType: { type: String, enum: ['free', 'silver', 'gold', 'party'], default: 'free' },
      validUntil: { type: Date, default: null }
    },
    default: { membershipType: 'free', validUntil: null }
  })
  membership: {
    membershipType: 'free' | 'silver' | 'gold' | 'party';
    validUntil: Date | null;
  };

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now, required: true })
  updatedAt: Date;
};

export const UserSchema = SchemaFactory.createForClass(User);