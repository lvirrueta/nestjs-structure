import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@auth/domain/interface/i-user';

export class UserApi implements IUser {
  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  password: string;
}
