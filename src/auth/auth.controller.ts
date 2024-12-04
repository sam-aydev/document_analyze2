import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { Auth } from './decorator/auth/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.newUserAuth(createUserDto);
  }

  @Post('login')
  loginUser(@Body() signInDto: SignInDto) {
    return this.authService.logIn(signInDto);
  }

  @Auth(AuthType.None)
  @Get('xup')
  getUser() {
    return 'hello';
  }
}
