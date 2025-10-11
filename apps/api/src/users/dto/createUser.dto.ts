import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Length(5, 80 , { message: 'Email must be between 5 and 80 characters long' })
  @IsNotEmpty( { message: 'Email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty( { message: 'Username should not be empty' })
  @Length(3, 40, { message: 'Username must be between 3 and 40 characters long' })
  username: string;

  @IsString()
  @IsNotEmpty( { message: 'Password should not be empty' })
  @Length(6, 100, { message: 'Password must be between 6 and 100 characters long' })
  password: string;

  @IsString()
  fullname?: string;
}