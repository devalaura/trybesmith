import OrderModel from '../models/Order';
import connection from '../models/connection';
// import Order from '../interfaces/Order';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public getAll = async () => {
    const orders = await this.model.getAll();
    
    const result = orders.map(({ id, userId, productsIds }) => ({ 
      id,
      userId,
      productsIds: [productsIds] }));
    
    return result;
  };
}