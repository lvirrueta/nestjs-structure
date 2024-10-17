import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IUser } from 'src/auth/domain/interface/i-user';

/** Keys To Pick */
type PickKeys = Pick<IUser, 'username' | 'password'>;

export class SignUpDto implements PickKeys {
  @ApiProperty({ description: 'username of the user', example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password of user', example: 'admin1234' })
  @IsString()
  password: string;
}
