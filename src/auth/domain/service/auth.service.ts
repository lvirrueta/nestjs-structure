// Dependencies
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

// Repositories

// Interface

// DTO

// Constants

@Injectable()
export class AuthService {
  constructor(@Inject(UserRepository) public readonly userRepository: UserRepository) {}

  /** Register to the application */
  public async createUser(): Promise<any> {
    return await this.userRepository.find();
  }
}
