import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../db-schema/user.schema';
import { SignupDto } from '../dtos/signup.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data:SignupDto): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAllUsers(): Promise<UserDto[]> {
    return this.userModel.find({}, 'fullName email').exec();
  }
}
