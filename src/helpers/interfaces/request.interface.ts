import { Request } from 'express';

export interface NatiToken {
  id: number;
  emailAddress: string;
}
export interface NatiRequest extends Request {
  user: NatiToken;
}
