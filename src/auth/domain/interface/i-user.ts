import { ID } from '@shared/app/types/types.types';
import { UserTypeEnum } from '../enum/user.enum';

export interface IUser {
  id?: ID;
  username: string;
  password: string;
  entType?: UserTypeEnum;
}
