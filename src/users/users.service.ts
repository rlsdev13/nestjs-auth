import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

  create(createUserDto: CreateUserDto) : Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() : Promise<User[]> {
    return this.userModel.find({ deleted : false }).exec();
  }

  findOne(id: string) : Promise<User>{
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) : Promise<User> {
    const user = this.findOne(id);

    if(!user){
      throw new NotFoundException('User not found', { cause: new Error(), description: `User with id ${id} not found` })
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new : true }).exec();
  }

  async remove(id: string) : Promise<User> {
    const user = this.findOne(id);

    if(!user){
      throw new NotFoundException('User not found', { cause: new Error(), description: `User with id ${id} not found` })
    }

    return this.userModel.findByIdAndUpdate(id, { deleted : true }, { new : true })
  }
}
