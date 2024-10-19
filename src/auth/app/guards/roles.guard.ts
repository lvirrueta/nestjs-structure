import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { UserStrategy } from '@auth/domain/model/user-strategy';
import { UserGroupEnum } from '@auth/domain/enum/user-group.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = new UserStrategy(request.user);
    return this.matchUsergroup(user, roles);
  }

  private matchUsergroup(user: UserStrategy, groups: UserGroupEnum[]): boolean {
    const res = groups.includes(user.userGroup);
    return res;
  }
}
