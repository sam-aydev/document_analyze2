import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async newUserAuth(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOne(createUserDto);
    if (existingUser) throw new ConflictException('User already exists');
    return await this.userService.create(createUserDto);
  }

  public async logIn(signInDto: SignInDto) {
    let isUser: boolean = false;

    const user = await this.userService.findOne(signInDto);
    if (!user) throw new ConflictException('User does not exist!');
    isUser = await verify(user.password, signInDto.password);

    if (!isUser) throw new UnauthorizedException('Incorrect password!');
    console.log(isUser, user);
    return user;
  }
}
