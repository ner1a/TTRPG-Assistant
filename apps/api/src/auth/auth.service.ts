import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, ObjectId } from 'mongoose';
import { User } from '../users/userSchema';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import type { User as PublicUser } from '@repo/types';
import { toPublicUser } from 'src/users/users.mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ ok: boolean }> {
    const { email, username } = createUserDto;
    const users = this.userModel;
    const [byEmail, byUsername] = await Promise.all([
      users.findOne({ email }),
      users.findOne({ username }),
    ]);
    if (byEmail) throw new BadRequestException('Email already in use');
    if (byUsername) throw new BadRequestException('Username already in use');
    //Checked email and username already exist or unique
    else {
      //Password hashed and user saved to db
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const newUser = new this.userModel({
        username: createUserDto.username,
        email: createUserDto.email,
        passwordHash: hashedPassword,
      });
      await newUser.save();
      return { ok: true };
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const accessToken = await this.createAccessToken(user._id);
      return  {accessToken};
    }
    throw new UnauthorizedException('Wrong password');
  }

  //access token create method
  private async createAccessToken(
    sub: ObjectId,
  ): Promise<string> {
    const payload = { sub };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
