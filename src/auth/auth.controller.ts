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

  @Auth(AuthType.None)
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.newUserAuth(createUserDto);
  }

  @Auth(AuthType.None)
  @Post('login')
  loginUser(@Body() signInDto: SignInDto) {
    return this.authService.logIn(signInDto);
  }

  @Auth(AuthType.Bearer)
  @Get('xup')
  getUser() {
    return 'hello';
  }
}
