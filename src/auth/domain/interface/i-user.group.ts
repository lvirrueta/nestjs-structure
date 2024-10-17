import { ID } from '@shared/app/types/types.types';
import { UserGroupEnum } from '../enum/user-group.enum';

export interface IUserGroup {
  id: ID;
  name: string;
  scope: UserGroupEnum;
}
