import { CreateAccountDTO } from '@shared/dtos/CreateAccountDTO';
import { Account } from '../infra/typeorm/entities/Account';

interface IAccountRepository {
  create(account: CreateAccountDTO): Promise<Account>;
  findAccountByUsername(username: string): Promise<Account>;
  findAccountByEmail(email: string): Promise<Account>;
}

export { IAccountRepository };
