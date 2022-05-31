import { Pool, ResultSetHeader } from 'mysql2/promise';

import User from '../interfaces/User';

export default class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public create = async (username: string, classe: string, level: number, password: string): 
  Promise<User[] | void> => {
    const [user] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );

    const { insertId } = user;

    return [{ id: insertId, username, classe, level, password, route: 201 }] as User[];
  };

  public login = async (username: string, password: string): Promise<User[] | void> => {
    const [user] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    
    return user as User[];
  };

  public getById = async (id: number | undefined): Promise<boolean | void> => {
    const [user] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE id = ?',
      [id],
    );
    if (!user) return false;
    return true;
  };
}
