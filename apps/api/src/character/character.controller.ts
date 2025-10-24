import {
  Controller,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  Get,
  Param,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { CurrentUser, JwtUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post('create')
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
    @CurrentUser() user: JwtUser,
  ) {
    if (!user?.id) throw new UnauthorizedException('Missing auth context');
    const res = await this.characterService.create(createCharacterDto, user.id);
    return res;
  }

  @Get()
  async mine(@CurrentUser() user: JwtUser) {
    if (!user?.id) throw new UnauthorizedException('Missing auth context');
    return this.characterService.findMine(user.id);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.characterService.findById(id);
  }
}
