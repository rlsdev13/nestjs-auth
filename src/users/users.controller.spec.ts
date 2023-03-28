import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService : Partial<UsersService>;

  beforeEach(async () => {
    mockUsersService = {
      create : jest.fn((createUserDto : CreateUserDto) => {
        return Promise.resolve({
          id : Date.now().toString(),
          ...createUserDto,
          deleted : false,
        } as User)
      }),
      update : jest.fn((id : string, updateUserDto : UpdateUserDto) => {
        return Promise.resolve({
          id : Date.now().toString(),
          ...updateUserDto,
          deleted : false
        } as User )
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto : CreateUserDto = {
      name : "User",
      lastNameF : "Userlastf",
      lastNameM : "Userlastm", 
      email : "user1@gmail.com",
      password : "1234567",
    };
    
    const { deleted, ...user } = await controller.create(createUserDto);

    expect(user).toEqual({
      id : expect.any(String),
      ...user
    });
  });

  it('should update a user', async () => {
    const id : string = "sda21f5sd";
    const updateUserDto : UpdateUserDto = {
      name : 'User update'
    };

    const { deleted, ...user } = await controller.update(id,updateUserDto);

    expect(user).toEqual({
      id,
      ...user
    });

    expect(mockUsersService.update).toHaveBeenCalledWith(
      id,
      updateUserDto
    )
  });


});
