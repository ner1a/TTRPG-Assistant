import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { CreateGameDto } from './dto/createGame.dto';

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create')
  async create(
    @Body() createGameDto: CreateGameDto,
    @CurrentUser() user: JwtUser,
  ) {
    if (!user?.id) throw new UnauthorizedException('Missing auth context');
    const res = await this.gameService.create(createGameDto, user.id)
    return res;
  }
}
