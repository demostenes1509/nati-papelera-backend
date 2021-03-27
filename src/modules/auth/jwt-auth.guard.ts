import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NatiToken } from 'src/helpers/interfaces';
import { ROLES_KEY } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  @Inject()
  private reflector: Reflector;

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const user: NatiToken = context.switchToHttp().getRequest().user;
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
