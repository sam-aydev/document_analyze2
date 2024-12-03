import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { SignInDto } from '../dto/signin.dto';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async signIn(signInDto: SignInDto) {
    let isUser: boolean = false;

    const user = await this.userService.findOne(signInDto);
    if (!user) throw new ConflictException('User does not exist!');
    isUser = await verify(user.password, signInDto.password);

    if (!isUser) throw new UnauthorizedException('Incorrect password!');
    console.log(isUser, user);

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
