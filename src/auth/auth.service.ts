import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { SignInProvider } from './providers/sign-in.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly signInService: SignInProvider,
  ) {}

  public async newUserAuth(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOne(createUserDto);
    if (existingUser) throw new ConflictException('User already exists');
    return await this.userService.create(createUserDto);
  }

  public async logIn(signInDto: SignInDto) {
    return await this.signInService.signIn(signInDto);
  }
}
