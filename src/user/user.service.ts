import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserService } from './providers/create-user.service';
import { FindOneUser } from './providers/find-one-user.service';
import { FindAllUsers } from './providers/find-all.service';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findOneUser: FindOneUser,
    private readonly findAllUser: FindAllUsers,
  ) {}
  public async create(createUserDto: CreateUserDto) {
    return await this.createUserService.createUser(createUserDto);
  }

  public async findOne(createUserDto: CreateUserDto) {
    return await this.findOneUser.findOneUser(createUserDto);
  }

  public async findAll() {
    return await this.findAllUser.findAll();
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
