import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/auth/domain/interface/i-user';
import { CreateUserDto } from './create-user.dto';
import { IsUUID } from 'class-validator';

export class UpdateUserDto extends CreateUserDto implements IUser {
  @ApiProperty({ description: 'id of the user', example: '6870267c-3f9e-42d1-a514-26caf0967686' })
  @IsUUID()
  id: string;
}
