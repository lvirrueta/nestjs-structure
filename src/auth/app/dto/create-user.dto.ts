import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ID } from '@shared/app/types/types.types';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
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

  @ApiPropertyOptional({ description: 'id of the userGroup', example: '6870267c-3f9e-42d1-a514-26caf0967686' })
  @IsUUID()
  @IsOptional()
  userGroupId?: ID;

  @ApiProperty({ description: 'Nivel del usuario', example: '0' })
  level: number;
}
