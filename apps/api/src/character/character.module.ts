import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './characterSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Character',
        schema: CharacterSchema
      }
    ])
  ],
  providers: [CharacterService],
  controllers: [CharacterController]
})
export class CharacterModule {}
