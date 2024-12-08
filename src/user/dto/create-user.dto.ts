import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'username of the user',
  })
  @IsString()
  @MinLength(4, {
    message: 'The username must have at least 4 characters',
  })
  @MaxLength(8, {
    message: 'The username should be less than 8 characters',
  })
  @IsNotEmpty()
  username?: string;

  @ApiProperty({
    description: 'email of the user',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password of the user',
  })
  @IsString()
  @MinLength(6, {
    message: 'password must be at least 6 characters',
  })
  @MaxLength(12, {
    message: 'The password should be less than 12 characters',
  })
  password: string;
}
