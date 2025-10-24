import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './partySchema';
import { Model } from 'mongoose';
import { CreatePartyDto } from './dto/createParty.dto';

@Injectable()
export class PartyService {
  constructor(@InjectModel(Party.name) private partyModel: Model<Party>) {}

  async create(
    createPartyDto: CreatePartyDto,
    ownerId: string,
  ): Promise<{ ok: boolean }> {
    const newParty = new this.partyModel({ ...createPartyDto, ownerId });
    await newParty.save();
    return { ok: true };
  }

  async findById(id:string): Promise<Party> {
    return await this.partyModel.findById(id);
  }
}
