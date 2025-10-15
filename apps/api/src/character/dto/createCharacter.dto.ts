import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty({ message: 'Character name should not be empty' })
  @IsString()
  @Length(6, 100, {
    message: 'Character name must be between 6 and 100 characters long',
  })
  name: string;

  @IsString()
  @Length(6, 50, {
    message: 'Class name must be between 6 and 50 characters long',
  })
  @IsOptional()
  class: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  level: number;

  @IsString()
  @IsOptional()
  background: string;
}
