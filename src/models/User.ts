import { Pool, ResultSetHeader } from 'mysql2/promise';

import User from '../interfaces/User';

export default class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public create = async (username: string, classe: string, level: number, password: string): 
  Promise<void> => {
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
  };

  public login = async (username: string, password: string): Promise<User[] | void> => {
    const [success] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );

    if (success) return success as User[];
  };
}
