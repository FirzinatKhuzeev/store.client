import { UserRegistration } from './user-registration';

export class User implements UserRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

export class ForgotPasswordForm {
  email: string;
}
