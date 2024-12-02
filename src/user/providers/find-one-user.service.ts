import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { SignInDto } from 'src/auth/dto/signin.dto';

@Injectable()
export class FindOneUser {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneUser(createUserDto: CreateUserDto | SignInDto) {
    return await this.userRepository.findOneBy({ email: createUserDto.email });
  }
}
