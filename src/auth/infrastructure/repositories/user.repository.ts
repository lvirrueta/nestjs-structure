// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from 'src/shared/infrastructure/repository/generic.repository';

// Interface
import { IUserAbstractRepository } from '@auth/domain/irepositories/user.repository.interface';

// Entities
import { UserEntity } from '../entities/user/user.entity';
import { UserAdminEntity } from '@auth/infrastructure/entities/user/user-admin.entity';
import { UserCustomerEntity } from '@auth/infrastructure/entities/user/user-customer.entity';
import { UserOperativeEntity } from '@auth/infrastructure/entities/user/user-operative.entity';

// @Injectable()
export abstract class UserAbstractRepository<E extends UserEntity> extends GenericRepository<E> implements IUserAbstractRepository<E> {
  relations(): (object: UserEntity) => any {
    return (r) => [r.userGroup];
  }

  public async findByUsername(username: string): Promise<E> {
    return await this.findOne({ where: { username } as any });
  }
}

@Injectable()
export class UserRepository extends UserAbstractRepository<UserEntity> {
  constructor(public readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}

@Injectable()
export class UserAdminRepository extends UserAbstractRepository<UserAdminEntity> {
  constructor(public readonly dataSource: DataSource) {
    super(UserAdminEntity, dataSource);
  }
}

@Injectable()
export class UserOperativeRepository extends UserAbstractRepository<UserOperativeEntity> {
  constructor(public readonly dataSource: DataSource) {
    super(UserOperativeEntity, dataSource);
  }
}

@Injectable()
export class UserCustomerRepository extends UserAbstractRepository<UserCustomerEntity> {
  constructor(public readonly dataSource: DataSource) {
    super(UserCustomerEntity, dataSource);
  }
}
