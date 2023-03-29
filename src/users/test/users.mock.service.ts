import { CreateUserDto } from "./../dto/create-user.dto"
import { UpdateUserDto } from "./../dto/update-user.dto"
import { User } from "./../entities/user.entity"

export class UsersServiceMock{

    mockUser : User = {
        email : 'user@gmail.com',
        name : 'user',
        lastNameF : 'lastnamef',
        lastNameM : 'lastnamem',
        deleted : false,
        password : 'asdfsdf'
    }

    create(createUserDto : CreateUserDto) : Promise<User> {
        return Promise.resolve({
            id : Date.now().toString(),
            ...createUserDto,
            deleted : false,
        } as User);
    }

    findAll() : Promise<User[]>{
        return Promise.resolve([this.mockUser]);
    }

    findOne(id : string): Promise<User>{
        return Promise.resolve({
            id,
            ...this.mockUser
        });
    }

    update(id : string, updateUserDto : UpdateUserDto ) : Promise<User>{
        return Promise.resolve({
            id : Date.now().toString(),
            ...updateUserDto,
            deleted : false
        } as User );
    }

    remove(id : string) : Promise<User>{
        return Promise.resolve({
            id,
            ...this.mockUser,
            deleted : true,
        } as User);
    }
    
}