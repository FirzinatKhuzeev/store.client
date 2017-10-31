import { User } from './user';

export class Token {
  id: string;
  token: string;
  expiration: Date;
  user: User;
}
