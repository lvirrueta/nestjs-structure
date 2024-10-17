import { UserGroupEntity } from '@auth/infrastructure/entities/user-group.entity';
import { IGenericRepository } from 'src/shared/domain/irepositories/i-generic-repository.interface';

/**
 * @param E - Model Entity
 */
export type IUserGroupRepository = IGenericRepository<UserGroupEntity>;
