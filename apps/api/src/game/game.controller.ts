import {
  Body,
  Controller,
  Get,
  Param,
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

  @Get()
  async getMyGames(@CurrentUser() user: JwtUser) {
    if (!user?.id) throw new UnauthorizedException('Missing auth context');
    const res = await this.gameService.findMyGames(user.id)
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id:string) {
    return await this.gameService.findById(id);
  }
}
