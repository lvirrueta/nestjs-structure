// Dependencies
import { Inject, Injectable } from '@nestjs/common';

// Repositories
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

// Interface
import { IUser } from '../interface/i-user';
import { IUserRepository } from '../irepositories/user.repository.interface';

// Types
import { ID } from '@shared/app/types/types.types';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) public readonly userRepository: IUserRepository) {}

  /** Get All Users */
  public async getUsers(): Promise<IUser[]> {
    return await this.userRepository.listEntities();
  }

  /** Get One User*/
  public async detailUser(id: ID): Promise<IUser> {
    return await this.userRepository.findOneEntity(id);
  }

  /** Delete One User */
  public async deleteUser(id: ID): Promise<IUser> {
    return await this.userRepository.deleteEntity(id);
  }
}
