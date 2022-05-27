import { Pool } from 'mysql2/promise';

import Product from '../interfaces/Product';

export default class ProductModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Product[]> => {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );
    const [products] = result;
    return products as Product[];
  };
}
