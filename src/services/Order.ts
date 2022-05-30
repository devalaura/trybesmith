import OrderModel from '../models/Order';
import UserModel from '../models/User';
import connection from '../models/connection';
import Order from '../interfaces/Order';
import User from '../interfaces/User';

export default class OrderService {
  public model: OrderModel;

  public userModel: UserModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.userModel = new UserModel(connection);
  }

  public getAll = async () => {
    const orders = await this.model.getAll();
    
    const result = orders.map(({ id, userId, productsIds }) => ({ 
      id,
      userId,
      productsIds: [productsIds] }));
    
    return result;
  };

  public create = async (productsIds: number[], user: User[] | void): 
  Promise<Order> => {
    if (user) {
      const { id } = user[0];
      const findUser = await this.userModel.getById(id);
      if (findUser) {
        productsIds.map(async (productId) => {
          await this.model.create(id, productId);
        });

        return {
          userId: id,
          productsIds,
        } as Order;
      }
    }
    return { status: 401, message: 'Invalid token' } as Order;
  };
}