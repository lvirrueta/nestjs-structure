import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { IUser } from 'src/auth/domain/interface/i-user';

/** Keys To Omit */
type OmitKeys = Pick<IUser, 'id'>;
type IUserOmit = Omit<IUser, keyof OmitKeys>;

export class CreateUserDto implements IUserOmit {
  @ApiProperty({ description: 'username of the user', example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password of user', example: 'admin1234' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Tipo de usuario', example: UserTypeEnum.ADMIN, enum: UserTypeEnum })
  @IsEnum(UserTypeEnum)
  entType: UserTypeEnum;
}
