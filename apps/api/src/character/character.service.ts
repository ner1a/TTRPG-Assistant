import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './characterSchema';
import { CreateCharacterDto } from './dto/createCharacter.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
  ) {}

  async create(
    createCharacterDto: CreateCharacterDto,
    ownerId: string,
  ): Promise<{ ok: boolean }> {
    const newChar = new this.characterModel({ ...createCharacterDto, ownerId });
    await newChar.save();

    return { ok: true };
  }

  async findMine(ownerId: string): Promise<Character[]> {
    return this.characterModel
      .find({ ownerId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findById(id: string): Promise<Character> {
    return await this.characterModel.findById(id);
  }
}
