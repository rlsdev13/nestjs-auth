import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService : UsersService,
        private readonly jwtService : JwtService
    ){}

    async validateUser(dataLogin : LoginDto) : Promise<User>{
        const {email, password} = dataLogin;
        const user = await this.userService.findByEmail(email);
        
        if(!user){
            throw new UnauthorizedException();
        }
        
        const validatePass = await bcrypt.compareSync(password,user.password);

        if(!validatePass){
            throw new UnauthorizedException();
        }
        
        return user;
    }

    async jwtGenerateToken(user : User){ 
        const { _id: id } = user as any;
        
        const payload = { id };


        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }

}
