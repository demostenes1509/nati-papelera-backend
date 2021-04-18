import { Request } from 'express';

export interface UserTokenInfo {
  emailAddress: string;
  fullName: string;
  role: string;
  isAdmin: boolean;
}
export interface TokenInfo extends Request {
  user: UserTokenInfo;
}
