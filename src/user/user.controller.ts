import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(202)
  @Auth(AuthType.None)
  @Get()
  @ApiOperation({
    summary: "this get's all the user in the database",
  })
  @ApiResponse({
    status: 202,
    description: 'users fetched successfully!',
  })
  public findAllUser() {
    return this.userService.findAll();
  }
}
