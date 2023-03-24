import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

  async create(createUserDto: CreateUserDto) : Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const newUser = createdUser.save();
    return newUser;
  }

  async findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) : Promise<User>{
    return this.userModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
