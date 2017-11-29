import { Identifiable } from './Identfiable.model';
export class User implements Identifiable{
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
