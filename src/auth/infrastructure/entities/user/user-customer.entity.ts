import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { ChildEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from '@auth/domain/interface/i-user';

@ChildEntity(UserTypeEnum.CUSTOMER)
export class UserCustomerEntity extends UserEntity implements IUser {}
