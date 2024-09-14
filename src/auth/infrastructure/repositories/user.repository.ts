// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository
import { GenericRepository } from 'src/shared/infrastructure/repository/generic.repository';

// Interface
import { IUserRepository } from 'src/auth/domain/irepositories/user.repository.interface';

// Entities
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends GenericRepository<UserEntity> implements IUserRepository {
  constructor(public readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
  async findByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ where: { username } });
  }
}
