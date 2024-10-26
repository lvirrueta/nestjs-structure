// Dependencies
import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

// Repositories
import {
  UserRepository,
  UserAdminRepository,
  UserCustomerRepository,
  UserOperativeRepository,
} from '@auth/infrastructure/repositories/user.repository';

// Entities
import { UserEntity } from '@auth/infrastructure/entities/user/user.entity';
import { UserAdminEntity } from '@auth/infrastructure/entities/user/user-admin.entity';
import { UserCustomerEntity } from '@auth/infrastructure/entities/user/user-customer.entity';
import { UserOperativeEntity } from '@auth/infrastructure/entities/user/user-operative.entity';

// Dto
import { CreateUserDto } from '@auth/app/dto/create-user.dto';
import { UpdateUserDto } from '@auth/app/dto/update-user.dto';

// Interface
import {
  IUserRepository,
  IUserAdminRepository,
  IUserAbstractRepository,
  IUserCustomerRepository,
  IUserOperativeRepository,
} from '@auth/domain/irepositories/user.repository.interface';

// Types
import { ID } from '@shared/app/types/types.types';

// Constants
import { Errors } from '@shared/app/error/error.constants';

// Utilities
import { ThrowError } from '@shared/app/utils/throw-error';

export abstract class UserAbstractService<E extends UserEntity, R extends IUserAbstractRepository<E>> {
  constructor(public readonly userRepository: R) {}

  /** Get All Users */
  public async getUsers(): Promise<E[]> {
    return await this.userRepository.listEntities();
  }

  /** Get One User*/
  public async detailUser(id: ID): Promise<E> {
    return await this.userRepository.findOneEntity(id);
  }

  /** Get One User by username*/
  public async findByUsername(username: string): Promise<E> {
    return await this.userRepository.findByUsername(username);
  }

  /** Create One User */
  public async createUser(dto: CreateUserDto): Promise<E> {
    const { password } = dto;

    dto.password = await this.hashPassword(password);
    const user = this.userRepository.instanceEntity(dto);

    try {
      return await this.userRepository.saveEntity(user, { handleError: false });
    } catch (e) {
      if (e?.code === '23505') {
        ThrowError.httpException(Errors.Auth.UserRegistered);
      }
      throw e;
    }
  }

  /** Update One User */
  public async updateUser(dto: UpdateUserDto): Promise<E> {
    const { password } = dto;

    dto.password = await this.hashPassword(password);
    const user = this.userRepository.instanceEntity(dto);

    return await this.userRepository.updateEntity(user);
  }

  /** Delete One User */
  public async deleteUser(id: ID): Promise<E> {
    return await this.userRepository.deleteEntity(id);
  }

  /** Hash Password */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}

@Injectable()
export class UserService extends UserAbstractService<UserEntity, IUserRepository> {
  constructor(@Inject(UserRepository) public readonly userRepository: IUserRepository) {
    super(userRepository);
  }
}

@Injectable()
export class UserAdminService extends UserAbstractService<UserAdminEntity, IUserAdminRepository> {
  constructor(@Inject(UserAdminRepository) public readonly userAdminRepository: IUserAdminRepository) {
    super(userAdminRepository);
  }
}

@Injectable()
export class UserCustomerService extends UserAbstractService<UserCustomerEntity, IUserCustomerRepository> {
  constructor(@Inject(UserCustomerRepository) public readonly userCustomerRepository: IUserCustomerRepository) {
    super(userCustomerRepository);
  }
}

@Injectable()
export class UserOperativeService extends UserAbstractService<UserOperativeEntity, IUserOperativeRepository> {
  constructor(@Inject(UserOperativeRepository) public readonly userOperativeRepository: IUserOperativeRepository) {
    super(userOperativeRepository);
  }
}
