import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NatiToken } from 'src/helpers/interfaces';
import { ROLES_KEY } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';
import { SessionService } from '../session/session.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  @Inject()
  private reflector: Reflector;

  @Inject()
  private sessionService: SessionService;

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const { authorization } = context.switchToHttp().getRequest().headers;

    console.log('================');
    const pepe = await this.sessionService.getSessionInfo(authorization);
    console.log(pepe);
    console.log('================');

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
