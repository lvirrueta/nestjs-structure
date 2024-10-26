import { ID } from '@shared/app/types/types.types';
import { UserTypeEnum } from '../enum/user.enum';
import { IUser } from '../interface/i-user';
import { UserGroupEnum } from '../enum/user-group.enum';

/** Keys To Omit */
type OmitKeys = Pick<IUser, 'password'>;
type IUserOmit = Omit<IUser, keyof OmitKeys>;

export class UserStrategy implements IUserOmit {
  id: ID;
  username: string;
  entType: UserTypeEnum;
  level: number;

  constructor(obj: IUserOmit) {
    const { id, level, username, entType } = obj;
    this.id = id;
    this.username = username;
    this.entType = entType;
    this.level = level;
  }

  public get userGroup(): UserGroupEnum {
    if (this.entType === UserTypeEnum.ADMIN && this.level === 0) return UserGroupEnum.ADMIN;

    if (this.entType === UserTypeEnum.OPERATIVE && this.level === 0) return UserGroupEnum.ADMINOPERATIVE;
    if (this.entType === UserTypeEnum.OPERATIVE && this.level === 1) return UserGroupEnum.OPERATIVE;

    if (this.entType === UserTypeEnum.CUSTOMER && this.level === 0) return UserGroupEnum.CUSTOMER;

    return UserGroupEnum.CUSTOMER;
  }
}
