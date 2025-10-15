import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePartyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50, {
    message: 'Party name must be between 3 and 50 characters long',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, {
    message: 'Game description must be up to 2000 characters long',
  })
  description: string;
}
