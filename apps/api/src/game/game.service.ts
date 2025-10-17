import { Injectable } from '@nestjs/common';
import { Game } from './gameSchema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGameDto } from './dto/createGame.dto';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async create(createGameDto: CreateGameDto, ownerId: string): Promise<{ok:boolean}>{
    const newGame = new this.gameModel({...createGameDto, ownerId})
    await newGame.save();
    return {ok:true}
  }

  async findMyGames(ownerId: string):Promise<Game[]> {
    const games = await this.gameModel.find({ownerId}).sort({ createdAt: -1 }).lean().exec()
    return games;
  }
}
