import { ApiProperty } from '@nestjs/swagger';

import { ID } from '@shared/app/types/types.types';
import { IUserGroup } from '@auth/domain/interface/i-user.group';
import { UserGroupEnum } from '@auth/domain/enum/user-group.enum';

export class UserGroupApi implements IUserGroup {
  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  id: ID;

  @ApiProperty({ example: 'admin' })
  name: string;

  @ApiProperty({ example: 'admin' })
  description: string;

  @ApiProperty({ enum: UserGroupEnum })
  scope: UserGroupEnum;
}
