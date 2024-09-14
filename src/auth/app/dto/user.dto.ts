import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/auth/domain/interface/i-user';

export class UserDto implements IUser {
  @ApiProperty({ description: 'id of the user', example: '6870267c-3f9e-42d1-a514-26caf0967686' })
  // @IsString()
  id: string;

  @ApiProperty({ description: 'username of the user', example: 'admin' })
  // @IsString()
  username: string;

  @ApiProperty({ description: 'password of user', example: 'admin1234' })
  // @IsString()
  password: string;
}
