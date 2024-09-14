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
import { UserService } from './domain/service/user.service';

// Repositories
import { UserRepository } from './infrastructure/repositories/user.repository';

// Strategies
import { JwtStrategy } from './app/strategies/jwt-strategy';

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
  providers: [AuthService, UserService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
