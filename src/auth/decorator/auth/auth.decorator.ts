import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from 'src/auth/constants/requestuserkey';
import { AuthType } from 'src/auth/enums/auth-type.enum';

export const Auth = (...auth: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, auth);
