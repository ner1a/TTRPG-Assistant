import { Injectable } from '@nestjs/common';
import { Game } from './gameSchema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGameDto } from './dto/createGame.dto';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private characterModel: Model<Game>) {}

  async create(createGameDto: CreateGameDto, ownerId: string): Promise<{ok:boolean}>{
    const newGame = new this.characterModel({...createGameDto, ownerId})
    await newGame.save();
    return {ok:true}
  }
}
