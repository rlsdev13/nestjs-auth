import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserDto } from './../dto/create-user.dto';
import { User } from './../entities/user.entity';
import { UserRepositoryMock } from './users.mock.repo';
import { UsersService } from './../users.service';


describe('UsersService', () => {
  let service: UsersService;
  let model : Model<User>;

  const mockUser : User = {
    email : 'user@gmail.com',
    name : 'user',
    lastNameF : 'lastnamef',
    lastNameM : 'lastnamem',
    deleted : false,
    password : 'asdfsdf'
}
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide : getModelToken(User.name),
          useClass : UserRepositoryMock,
          useValue: {
            exec: jest.fn()
          }

        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('should create a user', async () => {
    const createUserDto : CreateUserDto = {
      email : 'user@gmail.com',
      name : 'user',
      lastNameF : 'lastnamef',
      lastNameM : 'lastnamem',
      password : 'asdfsdf'
    }

    expect(await service.create(createUserDto)).toEqual({
      ...createUserDto,
      deleted : false
    });

  });

  it('should return all users', async () => {
    jest.spyOn(model,'find').mockReturnValue({
      exec : jest.fn().mockResolvedValueOnce([mockUser])
    } as any);

    expect(await service.findAll()).toEqual([mockUser])
  })
});
