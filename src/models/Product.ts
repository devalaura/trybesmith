import { Pool, ResultSetHeader } from 'mysql2/promise';

import Product from '../interfaces/Product';

export default class ProductModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Product[]> => {
    const [products] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );
    return products as Product[];
  };

  public create = async (name: string, amount: string): Promise<Product> => {
    const [createdProduct] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    return { 
      id: createdProduct.insertId,
      name,
      amount,
    };
  };

  public update = async (orderId: number, productId: number): Promise<void> => {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, productId],
    );
  };
}
