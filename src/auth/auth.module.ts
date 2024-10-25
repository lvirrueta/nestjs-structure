// Dependencies
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Controllers
import { AuthController } from './app/controller/auth.controller';
import { UserController } from './app/controller/user.controller';

// Services
import { AuthService } from './domain/service/auth.service';
import { UserAdminService, UserCustomerService, UserOperativeService, UserService } from './domain/service/user.service';

// Repositories
import {
  UserRepository,
  UserAdminRepository,
  UserCustomerRepository,
  UserOperativeRepository,
} from './infrastructure/repositories/user.repository';

// Strategies
import { JwtStrategy } from './app/strategies/jwt-strategy';
import { GoogleStrategy } from './app/strategies/google-oauth-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('CONFIG_JWT_SECRET'),
        };
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    // Providers
    JwtStrategy,
    GoogleStrategy,

    // Services
    AuthService,
    UserService,
    UserAdminService,
    UserCustomerService,
    UserOperativeService,

    // Repositories
    UserRepository,
    UserAdminRepository,
    UserCustomerRepository,
    UserOperativeRepository,
  ],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
