// Dependencies
import * as ms from 'ms';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';

// Services
import { UserAdminService, UserCustomerService, UserOperativeService, UserService } from './user.service';

// Interface
import { IJwtPayload } from '../interface/i-jwt-payload';
import { IAccessToken } from '../interface/i-access-token';

// DTO
import { SignUpDto } from 'src/auth/app/dto/sign-up.dto';
import { SignInDto } from 'src/auth/app/dto/sign-in.dto';

// Utilities
import { ThrowError } from '@shared/app/utils/throw-error';

// Types
import { ID } from '@shared/app/types/types.types';

// Constants
import { Errors } from '@shared/app/error/error.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserService) public readonly userService: UserService,
    @Inject(UserAdminService) public readonly userAdminService: UserAdminService,
    @Inject(UserCustomerService) public readonly userCustomerService: UserCustomerService,
    @Inject(UserOperativeService) public readonly userOperativeService: UserOperativeService,
  ) {}

  /** Login to the application */
  public async signIn(dto: SignInDto): Promise<IAccessToken> {
    const { password: passwordLogin, username } = dto;
    const userBD = await this.userService.findByUsername(username);
    const { password: passwordBD } = { ...userBD };

    if (this.comparePassword(passwordLogin, passwordBD) && userBD) {
      return await this.generateJwtToken(userBD.id);
    }

    ThrowError.httpException(Errors.Auth.IncorrectCredentials);
  }

  /** Register to the application */
  public async signUp(dto: SignUpDto): Promise<IAccessToken> {
    const { password, username } = dto;

    const user = await this.userCustomerService.createUser({ password, username, entType: undefined, userGroupId: undefined });

    return await this.generateJwtToken(user.id);
  }

  /** Compare Password login with password hashed in the DB */
  private comparePassword(passwordLogin: string, passwordUser: string): boolean {
    return bcrypt.compareSync(passwordLogin || '', passwordUser || '');
  }

  /** Generate JWT Token */
  private async generateJwtToken(userID: ID): Promise<IAccessToken> {
    const idToken = uuidv4();

    const payload: IJwtPayload = {
      userID,
      jti: idToken,
    };

    const msTokenExpire = '1h';
    const msRefreshTokenExpire = '2h';

    const accessToken = this.jwtService.sign(payload, { expiresIn: ms(msTokenExpire) });
    const refreshToken = this.jwtService.sign({ jti: idToken }, { expiresIn: ms(msRefreshTokenExpire) });

    return {
      accessToken,
      refreshToken,
    };
  }
}
