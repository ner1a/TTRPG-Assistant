import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/userSchema';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const newUser = new this.userModel({ ...createUserDto, passwordHash: hashedPassword });
        await newUser.save();
        console.log('User created:', newUser);
        return newUser;
    }

    async login(username: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username });
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            return user;
        }
        return null;
    }
}
