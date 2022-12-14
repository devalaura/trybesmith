import ProductModel from '../models/Product';
import connection from '../models/connection';
import Product from '../interfaces/Product';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    return products;
  };

  public create = async (name: string, amount: string): Promise<Product> => {
    const createdProduct = await this.model.create(name, amount);
    return createdProduct;
  };
}