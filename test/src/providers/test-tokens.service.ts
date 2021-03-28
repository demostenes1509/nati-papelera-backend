import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../src/models';
import { SessionService } from '../../../src/modules/session/session.service';

@Injectable()
export class TestTokens implements OnModuleInit {
  public adminToken: string;
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

    await this.sessionService.createSession(this.adminToken, admin);
    await this.sessionService.createSession(this.userToken, user);
  }
}
