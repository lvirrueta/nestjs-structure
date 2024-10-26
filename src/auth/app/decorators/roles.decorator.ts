import { UserGroupEnum } from '@auth/domain/enum/user-group.enum';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserGroupEnum[]>();
