import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../../../src/models';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TestTokens implements OnModuleInit {
  public adminToken: string;
  public userToken: string;

  @Inject()
  private readonly connection: Connection;

  @Inject()
  private readonly jwtService: JwtService;

  async onModuleInit() {
    const admin = await this.connection.manager.findOne(User, { where: { emailAddress: 'admin@natipapelera.com' } });
    const user = await this.connection.manager.findOne(User, { where: { emailAddress: 'user@natipapelera.com' } });

    this.adminToken = this.jwtService.sign({ id: admin.id, emailAddress: admin.emailAddress, role: admin.role });
    this.userToken = this.jwtService.sign({ id: user.id, emailAddress: user.emailAddress, role: user.role });
  }
}
