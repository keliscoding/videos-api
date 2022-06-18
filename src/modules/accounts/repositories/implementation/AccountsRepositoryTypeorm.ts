import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { CreateAccountDTO } from '@shared/dtos/CreateAccountDTO';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Repository } from 'typeorm';
import { IAccountsRepository } from '../IAccountsRepository';

class AccountsRepositoryTypeorm implements IAccountsRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = AppDataSource.getRepository(Account);
  }

  async create({
    username,
    email,
    password,
  }: CreateAccountDTO): Promise<Account> {
    const account = this.repository.create({ username, email, password });

    await this.repository.save(account);

    return account;
  }

  async findAccountByUsername(username: string): Promise<Account> {
    const account = await this.repository.findOneBy({ username });

    return account;
  }
  async findAccountByEmail(email: string): Promise<Account> {
    const account = await this.repository.findOneBy({ email });

    return account;
  }
}

export { AccountsRepositoryTypeorm };
