// Imports
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, Logger } from '@nestjs/common';

// Repository
import { UserRepository } from '@auth/infrastructure/repositories/user.repository';

// IRepository
import { IUserRepository } from '@auth/domain/irepositories/user.repository.interface';

// Interface
import { IJwtPayload } from '@auth/domain/interface/i-jwt-payload';

// Constants
import { ThrowError } from '@shared/app/utils/throw-error';
import { Errors } from '@shared/app/error/error.constants';
import { UserStrategy } from '@auth/domain/model/user-strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserRepository) public readonly userRepository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.CONFIG_JWT_SECRET}`,
    });
  }

  public logger = new Logger(this.constructor.name);

  async validate(payload: IJwtPayload): Promise<UserStrategy> {
    this.logger.log('validating...');
    const { userID } = payload;

    const user = await this.userRepository.findOneEntity(userID);

    if (!user) {
      this.logger.error('valid token, but user does not exists on db');
      ThrowError.httpException(Errors.Auth.TokenOkButUserNoExist);
    }

    const userStrategy = new UserStrategy({
      id: user.id,
      username: user.username,
      entType: user.entType,
      level: user.level,
    });

    this.logger.log('validation successful');
    this.logger.log('user strategy ->', userStrategy);
    return userStrategy;
  }
}
