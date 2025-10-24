import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PartyService } from './party.service';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreatePartyDto } from './dto/createParty.dto';

@UseGuards(JwtAuthGuard)
@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Post('create')
  async create(
    @Body() createPartyDto: CreatePartyDto,
    @CurrentUser() user: JwtUser,
  ) {
    if (!user?.id) throw new UnauthorizedException('Missing auth context');
    const res = await this.partyService.create(createPartyDto, user.id);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.partyService.findById(id);
  }
}
