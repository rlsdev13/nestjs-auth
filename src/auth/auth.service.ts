import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly userService : UsersService){}

    async signIn(dataLogin : LoginDto){
        const {email, password} = dataLogin;
        const user = await this.userService.findByEmail(email);

        if(!user){
           throw new UnauthorizedException();
        }

        return await bcrypt.compareSync(password,user.password);
    }

}
