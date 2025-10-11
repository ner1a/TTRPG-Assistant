import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameSchema } from './gameSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Game',
        schema: GameSchema
      }
    ])
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
