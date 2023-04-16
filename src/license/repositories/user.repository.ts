import { UserEntity } from './../entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  private logger = new Logger(UserRepository.name);

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    const result = await this.findOneBy({ username: username });
    return result;
  }

  async createUser(username: string, password: string): Promise<UserEntity> {
    const userData = new UserEntity();
    userData.username = username;
    userData.password = password;
    try {
      return await this.save(userData);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Fail create User');
    }
  }

  async findOneByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    return await this.findOneBy({ username: username, password: password });
  }
}
