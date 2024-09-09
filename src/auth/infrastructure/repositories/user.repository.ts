// Dependencies
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

// Repository

// Interface

// Entities
import { UserEntity } from '../entities/user.entity';
import { GenericRepository } from 'src/shared/infrastructure/repository/generic.repository';

@Injectable()
export class UserRepository extends GenericRepository<UserEntity> {
  constructor(public readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }

  public async findByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ where: { username } });
  }
}
