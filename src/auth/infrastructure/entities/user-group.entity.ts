import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ID } from 'src/shared/app/types/types.types';
import { IUserGroup } from '@auth/domain/interface/i-user.group';
import { UserGroupEnum } from '@auth/domain/enum/user-group.enum';

@Entity({ name: 'tblUserGroups' })
export class UserGroupEntity implements IUserGroup {
  @PrimaryGeneratedColumn('uuid', { name: 'UserGroup_uuid' })
  id: ID;

  @Column({ name: 'UserGroup_strName', unique: true })
  name: string;

  @Column({ name: 'UserGroupEnum', enumName: 'UserGroupEnum', type: 'enum', enum: UserGroupEnum })
  scope: UserGroupEnum;
}
