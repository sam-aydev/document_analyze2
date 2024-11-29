import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async newUserAuth(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOne(createUserDto);
    if (existingUser) throw new ConflictException('User already exists');
    return await this.userService.create(createUserDto);
  }
}
