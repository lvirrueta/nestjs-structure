import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { IUserStrategy } from '@auth/domain/interface/i-user.strategy';
import { UserTypeEnum } from '@auth/domain/enum/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: IUserStrategy = request.user;
    return this.matchRoles(user, roles);
  }

  private matchRoles(user: IUserStrategy, roles: UserTypeEnum[]): boolean {
    const { type } = user;

    return roles.includes(type);
  }
}
