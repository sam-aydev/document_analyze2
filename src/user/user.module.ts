import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from './providers/create-user.service';
import { FindOneUser } from './providers/find-one-user.service';
import { FindAllUsers } from './providers/find-all.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CreateUserService, FindOneUser, FindAllUsers],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
