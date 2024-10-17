import { ID } from '@shared/app/types/types.types';
import { UserTypeEnum } from '../enum/user.enum';

export interface IUserStrategy {
  id: ID;
  username: string;
  type: UserTypeEnum;
}
