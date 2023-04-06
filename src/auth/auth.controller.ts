import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ResponseLogingDto } from './dto/response-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post()
    @Serialize(ResponseLogingDto)
    async login(@Body() dataLogin : LoginDto){
        const usr = await this.authService.validateUser(dataLogin);
        return this.authService.jwtGenerateToken(usr);
    }
}
