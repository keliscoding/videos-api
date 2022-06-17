import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { CreateAccountDTO } from '@shared/dtos/CreateAccountDTO';
import { IAccountRepository } from '../IAccountRepository';

class AccountRepositoryInMemory implements IAccountRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  async create({
    username,
    email,
    password,
  }: CreateAccountDTO): Promise<Account> {
    const account = new Account();

    Object.assign(account, { username, email, password });

    this.accounts.push(account);

    return account;
  }

  async findAccountByUsername(username: string): Promise<Account> {
    return this.accounts.find(account => account.username === username);
  }

  async findAccountByEmail(email: string): Promise<Account> {
    return this.accounts.find(account => account.email === email);
  }
}

export { AccountRepositoryInMemory };
