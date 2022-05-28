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

  public login = async (username: string, password: string): Promise<object | void> => {
    const findUser = await this.model.login(username, password);

    if (!findUser) return { message: 'Username or password invalid' };
  };
}