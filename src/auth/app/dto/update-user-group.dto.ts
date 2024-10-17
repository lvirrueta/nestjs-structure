import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IUserGroup } from '@auth/domain/interface/i-user.group';
import { CreateUserGroupDto } from './create-user-group.dto';

export class UpdateUserGroupDto extends CreateUserGroupDto implements IUserGroup {
  @ApiProperty({ description: 'id of the user', example: '6870267c-3f9e-42d1-a514-26caf0967686' })
  @IsUUID()
  id: string;
}
