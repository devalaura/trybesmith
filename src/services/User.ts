import UserModel from '../models/User';
import connection from '../models/connection';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create = async (username: string, classe: string, level: number, password: string):
  Promise<void> => {
    await this.model.create(username, classe, level, password);
  };
}