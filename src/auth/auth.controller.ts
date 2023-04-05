import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post()
    async login(@Body() dataLogin : LoginDto){
        const usr = await this.authService.validateUser(dataLogin);
        return this.authService.jwtGenerateToken(usr);
    }
}
