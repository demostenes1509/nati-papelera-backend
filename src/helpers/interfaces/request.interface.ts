import { Request } from 'express';

export interface NatiToken {
  id: number;
  emailAddress: string;
  role: string;
}
export interface NatiRequest extends Request {
  user: NatiToken;
}
