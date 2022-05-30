import { Pool, ResultSetHeader } from 'mysql2/promise';

import Order from '../interfaces/Order';

export default class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Order[]> => {
    const [products] = await this.connection.execute(
      `SELECT Orders.id, Orders.userId, Products.id as productsIds 
      FROM Trybesmith.Orders JOIN Trybesmith.Products WHERE Products.orderId = Orders.id
      ORDER BY Orders.userId ASC;`,
    );
    return products as Order[];
  };

  public create = async (userId: number, productId: number): Promise<number> => {
    const [order] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId, productId) VALUES ?, ?',
      [userId, productId],
    );
    const { insertId } = order;

    return insertId;
  };
}
