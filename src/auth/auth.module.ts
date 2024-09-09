import { Module } from '@nestjs/common';
import { AuthController } from './app/controller/auth.controller';
import { AuthService } from './domain/service/auth.service';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
