import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashPassword = await hash(password);

    const newUser = this.userRepository.create({
      password: hashPassword,
      ...user,
    });
    return this.userRepository.save(newUser);
  }
}
