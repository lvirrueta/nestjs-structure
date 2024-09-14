// Dependencies
import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

// Repositories
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

// Dto
import { UserDto } from '@auth/app/dto/user.dto';

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

  /** Update One User */
  public async updateUser(dto: UserDto): Promise<IUser> {
    const { id, password } = dto;
    const userBD = await this.userRepository.findOneEntity(id);

    if (!userBD) return;
    dto.password = await this.hashPassword(password);

    return await this.userRepository.updateEntity(dto);
  }

  /** Delete One User */
  public async deleteUser(id: ID): Promise<IUser> {
    return await this.userRepository.deleteEntity(id);
  }

  /** Hash Password */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
