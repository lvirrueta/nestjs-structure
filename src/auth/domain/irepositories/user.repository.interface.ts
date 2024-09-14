/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserEntity } from 'src/auth/infrastructure/entities/user.entity';
import { IGenericRepository } from 'src/shared/domain/irepositories/i-generic-repository.interface';

/**
 * @param E - Model Entity
 */
export interface IUserRepository extends IGenericRepository<UserEntity> {
  findByUsername(username: string): Promise<UserEntity>;
}
