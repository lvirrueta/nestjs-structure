import { ID } from '@shared/app/types/types.types';
import { UserTypeEnum } from '../enum/user.enum';
import { IUserGroup } from './i-user.group';

export interface IUser {
  id: ID;
  username: string;
  password: string;
  entType: UserTypeEnum;
  userGroupId: ID;
  userGroup?: IUserGroup;
}
