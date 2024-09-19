import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { ChildEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from '@auth/domain/interface/i-user';

@ChildEntity(UserTypeEnum.ADMIN)
export class UserAdminEntity extends UserEntity implements IUser {}
