import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { GameModule } from './game/game.module';
import { PartyModule } from './party/party.module';


@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        dbName: 'ttrpgassistant'
      }),
    }),
    
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    
    UsersModule,
    
    AuthModule,
    
    CharacterModule,
    
    GameModule,
    
    PartyModule
  ],
  
  providers: [],
})
export class AppModule {}
