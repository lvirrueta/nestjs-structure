import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from '@auth/domain/interface/i-user';
import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { ID } from '@shared/app/types/types.types';

/** Keys To Omit */
type OmitKeys = Pick<IUser, 'password'>;
type IUserOmit = Omit<IUser, keyof OmitKeys>;
export class UserApi implements IUserOmit {
  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  id: ID;

  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ enum: UserTypeEnum })
  entType: UserTypeEnum;

  @ApiPropertyOptional({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  userGroupId?: ID;
}
