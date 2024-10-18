import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { ID } from 'src/shared/app/types/types.types';
import { IUser } from 'src/auth/domain/interface/i-user';
import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { UserGroupEntity } from '../user-group.entity';

@Entity({ name: 'tblUsers' })
@TableInheritance({
  column: 'entType',
})
export abstract class UserEntity implements IUser {
  constructor(dto?: IUser) {
    const { password, username } = { ...dto };
    this.password = password;
    this.username = username;
  }
  @PrimaryGeneratedColumn('uuid', { name: 'User_uuid' })
  id: ID;

  @Column({ name: 'User_strName', unique: true })
  username: string;

  @Column({ name: 'User_strPassword' })
  password: string;

  @Column({ name: 'User_entType', enumName: 'UserTypeEnum', type: 'enum', enum: UserTypeEnum, nullable: false })
  entType: UserTypeEnum;

  @Column({ name: 'UserGroup_uuid', type: 'varchar', nullable: true })
  userGroupId: ID;

  @ManyToOne(() => UserGroupEntity)
  @JoinColumn({ name: 'UserGroup_uuid' })
  userGroup: UserGroupEntity;
}
