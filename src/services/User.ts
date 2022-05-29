import UserModel from '../models/User';
import connection from '../models/connection';
import User from '../interfaces/User';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create = async (username: string, classe: string, level: number, password: string):
  Promise<User[] | void> => {
    const user = await this.model.create(username, classe, level, password);

    return user as User[];
  };

  public login = async (username: string, password: string): Promise<User[] | void> => {
    const user = await this.model.login(username, password);

    if (user?.length === 0) {
      return undefined;
    }

    return user;
  };
}