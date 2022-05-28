import OrderModel from '../models/Order';
import connection from '../models/connection';
import Order from '../interfaces/Order';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public getAll = async (): Promise<Order[]> => {
    const orders = await this.model.getAll();
    return orders;
  };
}