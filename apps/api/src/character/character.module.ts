import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './characterSchema';
import { JwtStrategy } from '../auth/jtw.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Character',
        schema: CharacterSchema,
      },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, JwtStrategy],
})
export class CharacterModule {}
