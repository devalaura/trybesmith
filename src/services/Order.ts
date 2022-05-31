import OrderModel from '../models/Order';
import ProductModel from '../models/Product';
import connection from '../models/connection';

export default class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public getAll = async () => {
    const orders = await this.model.getAll();
    
    const result = orders.map(({ id, userId, productsIds }) => ({ 
      id,
      userId,
      productsIds: [productsIds] }));
    
    return result;
  };

  public create = async (productsIds: number[], userId: number): 
  Promise<void> => {
    await Promise.all(productsIds.map(async (productId: number) => {
      const insertOrder = await this.model.create(userId);
      await this.productModel.update(insertOrder, productId);
    }));
  };
}