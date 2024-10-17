// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from '@shared/infrastructure/repository/generic.repository';

// Interface
import { IUserGroupRepository } from '@auth/domain/irepositories/user-group.repository.interface';

// Entities
import { UserGroupEntity } from '../entities/user-group.entity';

@Injectable()
export class UserGroupRepository extends GenericRepository<UserGroupEntity> implements IUserGroupRepository {
  constructor(public readonly dataSource: DataSource) {
    super(UserGroupEntity, dataSource);
  }
}
