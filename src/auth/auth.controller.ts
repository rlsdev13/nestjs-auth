import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post()
    login(@Body() dataLogin : LoginDto){
        return this.authService.signIn(dataLogin);
    }
}
