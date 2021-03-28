import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../src/models';
import { SessionService } from '../../../src/modules/session/session.service';

@Injectable()
export class TestTokens implements OnModuleInit {
  public adminToken: string;
  public adminExpiredToken: string;
  public userToken: string;

  @Inject()
  private readonly connection: Connection;

  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly sessionService: SessionService;

  async onModuleInit() {
    const admin = await this.connection.manager.findOne(User, { where: { emailAddress: 'admin@natipapelera.com' } });
    const user = await this.connection.manager.findOne(User, { where: { emailAddress: 'user@natipapelera.com' } });

    this.adminToken = this.jwtService.sign({ id: admin.id, emailAddress: admin.emailAddress, role: admin.role });
    this.userToken = this.jwtService.sign({ id: user.id, emailAddress: user.emailAddress, role: user.role });

    // Token to test session expiration
    this.adminExpiredToken = this.jwtService.sign({ id: admin.id, emailAddress: admin.emailAddress, role: 'fake' });

    await this.sessionService.createSession(this.adminToken);
    await this.sessionService.createSession(this.adminExpiredToken, 1); // ttl = 1 second
    await this.sessionService.createSession(this.userToken);
  }
}
