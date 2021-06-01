import { Request } from 'express';

export interface UserTokenInfo {
  emailAddress: string;
  fullName: string;
  role: string;
  isAdmin: boolean;
  oauthAccessToken: string;
  oauthRefreshToken: string;
}
export interface NatiRequest extends Request {
  user: UserTokenInfo;
}
