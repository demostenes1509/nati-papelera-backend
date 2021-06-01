import { ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '../../helpers/logger.helper';
import { UserTokenInfo } from '../../interfaces/request.interface';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { SessionService } from '../session/session.service';

class SessionExpiredException extends HttpException {
  constructor(response: string) {
    super(response, 419);
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  @Inject()
  private reflector: Reflector;

  @Inject()
  private sessionService: SessionService;

  async canActivate(context: ExecutionContext) {
    this.logger.verbose('Checking if token is valid');
    await super.canActivate(context);

    this.logger.verbose('Checking if token has expired');
    const { authorization } = context.switchToHttp().getRequest().headers;
    const isSessionExpired = await this.sessionService.isSessionExpired(authorization);
    if (isSessionExpired) {
      this.logger.verbose('Token has expired');
      throw new SessionExpiredException('Session has expired');
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    this.logger.verbose('Checking if method is restricted to some role');
    const user: UserTokenInfo = context.switchToHttp().getRequest().user;
    this.logger.verbose(JSON.stringify(user));
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
