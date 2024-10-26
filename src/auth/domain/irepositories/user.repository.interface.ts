import { UserEntity } from '@auth/infrastructure/entities/user/user.entity';
import { UserAdminEntity } from '@auth/infrastructure/entities/user/user-admin.entity';
import { UserCustomerEntity } from '@auth/infrastructure/entities/user/user-customer.entity';
import { UserOperativeEntity } from '@auth/infrastructure/entities/user/user-operative.entity';

import { IGenericRepository } from 'src/shared/domain/irepositories/i-generic-repository.interface';

/**
 * @param E - Model Entity
 */
export interface IUserAbstractRepository<E extends UserEntity> extends IGenericRepository<E> {
  findByUsername(username: string): Promise<E>;
}

export type IUserRepository = IUserAbstractRepository<UserEntity>;
export type IUserAdminRepository = IUserAbstractRepository<UserAdminEntity>;
export type IUserOperativeRepository = IUserAbstractRepository<UserOperativeEntity>;
export type IUserCustomerRepository = IUserAbstractRepository<UserCustomerEntity>;
