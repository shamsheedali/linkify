import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password } = createUserDto;

    // Check for existing user
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Return user without password
    return {
      id: (savedUser._id as string).toString(),
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}
