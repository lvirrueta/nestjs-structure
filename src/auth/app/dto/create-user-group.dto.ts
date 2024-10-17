import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { UserGroupEnum } from '@auth/domain/enum/user-group.enum';
import { IUserGroup } from '@auth/domain/interface/i-user.group';

/** Keys To Omit */
type OmitKeys = Pick<IUserGroup, 'id'>;
type IUserGroupOmit = Omit<IUserGroup, keyof OmitKeys>;

export class CreateUserGroupDto implements IUserGroupOmit {
  @ApiProperty({ description: 'username of the user', example: 'admin' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de usuario', example: UserGroupEnum.ADMIN, enum: UserGroupEnum })
  @IsEnum(UserGroupEnum)
  scope: UserGroupEnum;
}
