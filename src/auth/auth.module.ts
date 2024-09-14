import { Module } from '@nestjs/common';

// Controllers
import { AuthController } from './app/controller/auth.controller';
import { UserController } from './app/controller/user.controller';

// Services
import { AuthService } from './domain/service/auth.service';
import { UserService } from './domain/service/user.service';

// Repositories
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, UserRepository],
})
export class AuthModule {}
