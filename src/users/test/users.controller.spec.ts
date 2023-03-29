import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { User } from './../entities/user.entity';
import { UsersController } from './../users.controller';
import { UsersServiceMock } from './users.mock.service';
import { UsersService } from './../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser : User = {
    email : 'user@gmail.com',
    name : 'user',
    lastNameF : 'lastnamef',
    lastNameM : 'lastnamem',
    deleted : false,
    password : 'asdfsdf'
}

  beforeEach(async () => {
    const UsersServiceProvider = {
      provide : UsersService,
      useClass : UsersServiceMock
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useClass(UsersServiceMock)//user value for functions
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
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

    const updateSpy = jest.spyOn(service,'update');
    const { deleted, ...user } = await controller.update(id,updateUserDto);

    expect(user).toEqual({
      id,
      ...user
    });

    expect(updateSpy).toHaveBeenCalledWith(
      id,
      updateUserDto
    )
  });

  it('should find all users', async () => {
    expect(await controller.findAll()).toEqual([mockUser]);
  });

  it('should find a user by id', async () => {
    const id = "123456"
    const user = await controller.findOne(id);
    expect( user ).toEqual({
      ...mockUser,
      id
    });
  });

  it('should remove a user by id', async () => {
    const id = "asd21d";
    const user = await controller.remove(id);
    const { deleted, ...mock } = mockUser;
    expect(user).toEqual({
      id,
      ...mock,
      deleted : true
    })
  })

});
