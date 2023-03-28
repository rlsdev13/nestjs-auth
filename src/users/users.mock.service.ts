import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { User } from "./entities/user.entity"

export class UsersServiceMock{

    create(createUserDto : CreateUserDto) : Promise<User> {
        return Promise.resolve({
            id : Date.now().toString(),
            ...createUserDto,
            deleted : false,
        } as User);
    }

    update(id : string, updateUserDto : UpdateUserDto ) : Promise<User>{
        return Promise.resolve({
            id : Date.now().toString(),
            ...updateUserDto,
            deleted : false
        } as User );
    }
    
}