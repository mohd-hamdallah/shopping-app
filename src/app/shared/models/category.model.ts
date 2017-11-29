import { Identifiable } from 'app/shared/models/Identfiable.model';
export class Category implements Identifiable {
  id: string;
  name: string;

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
