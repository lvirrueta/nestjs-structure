// Dependencies
import { Inject, Injectable } from '@nestjs/common';

// Repositories
import { UserGroupRepository } from '@auth/infrastructure/repositories/user-group.repository';

// Entities
import { UserGroupEntity } from '@auth/infrastructure/entities/user-group.entity';

// Dto
import { CreateUserGroupDto } from '@auth/app/dto/create-user-group.dto';
import { UpdateUserGroupDto } from '@auth/app/dto/update-user-group.dto';

// Interface
import { IUserGroupRepository } from '../irepositories/user-group.repository.interface';

// Types
import { ID } from '@shared/app/types/types.types';

@Injectable()
export class UserGroupService {
  constructor(@Inject(UserGroupRepository) public readonly userRepository: IUserGroupRepository) {}

  /** Get All UserGroups */
  public async getUserGroups(): Promise<UserGroupEntity[]> {
    return await this.userRepository.listEntities();
  }

  /** Get One UserGroup*/
  public async detailUserGroup(id: ID): Promise<UserGroupEntity> {
    return await this.userRepository.findOneEntity(id);
  }

  /** Create One UserGroup */
  public async createUserGroup(dto: CreateUserGroupDto): Promise<UserGroupEntity> {
    const user = this.userRepository.instanceEntity(dto);
    return await this.userRepository.saveEntity(user);
  }

  /** Update One UserGroup */
  public async updateUserGroup(dto: UpdateUserGroupDto): Promise<UserGroupEntity> {
    const user = this.userRepository.instanceEntity(dto);
    return await this.userRepository.updateEntity(user);
  }

  /** Delete One UserGroup */
  public async deleteUserGroup(id: ID): Promise<UserGroupEntity> {
    return await this.userRepository.deleteEntity(id);
  }
}
