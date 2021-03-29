import { Request } from 'express';

export interface UserTokenInfo {
  id: number;
  emailAddress: string;
  role: string;
}
export interface TokenInfo extends Request {
  user: UserTokenInfo;
}
