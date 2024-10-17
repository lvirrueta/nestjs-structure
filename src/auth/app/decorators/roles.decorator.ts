import { UserTypeEnum } from '@auth/domain/enum/user.enum';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserTypeEnum[]>();
