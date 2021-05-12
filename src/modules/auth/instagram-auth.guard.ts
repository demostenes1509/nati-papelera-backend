import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class InstragramAuthGuard extends AuthGuard('instagram-token') {}
