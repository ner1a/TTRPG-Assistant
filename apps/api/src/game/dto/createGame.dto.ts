import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @Length(6, 200, {
    message: 'Game title must be between 6 and 200 characters long',
  })
  title: string;
 
  @IsNotEmpty()
  @IsString()
  system: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, {
    message: 'Game description must be up to 2000 characters long',
  })
  description: string;
}
