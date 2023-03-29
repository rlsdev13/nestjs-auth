import { User } from './../entities/user.entity';

export class UserRepositoryMock {

    mockUser : User = {
        email : 'user@gmail.com',
        name : 'user',
        lastNameF : 'lastnamef',
        lastNameM : 'lastnamem',
        deleted : false,
        password : 'asdfsdf'
    }

    create(user : User ) : Promise<User>{
        return Promise.resolve(this.mockUser);
    }

    find() : Promise<User[]>{
        return Promise.resolve([this.mockUser]);
    }

    findOne(id : string ) : Promise<User>{
        return Promise.resolve(this.mockUser);
    }

    update(id: string, user : User ) : Promise<User>{
        return Promise.resolve(Object.assign(this.mockUser,user));
    }

    remove(id : string) : Promise<User>{
        const { deleted, ...user } = this.mockUser;
        return Promise.resolve({
            ...user,
            deleted : true
        })
    }

}