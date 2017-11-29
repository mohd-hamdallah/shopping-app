import { Identifiable } from 'app/shared/models/Identfiable.model';

export class Product implements Identifiable {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
