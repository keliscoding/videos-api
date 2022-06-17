import bcryptjs from 'bcryptjs';

import { AppError } from '@errors/AppError';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository';
import { CreateAccountDTO } from '@shared/dtos/CreateAccountDTO';

class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({
    username,
    password,
    email,
  }: CreateAccountDTO): Promise<Account> {
    if (!username) throw new AppError('missing username field');
    if (!password) throw new AppError('missing password field');
    if (!email) throw new AppError('missing email field');

    const usernameExists = await this.accountRepository.findAccountByUsername(
      username,
    );
    if (usernameExists) throw new AppError('username already taken');

    const emailExists = await this.accountRepository.findAccountByEmail(email);
    if (emailExists) throw new AppError('email already taken');

    const encryptedPassword = await bcryptjs.hash(password, 10);

    const account = await this.accountRepository.create({
      username,
      password: encryptedPassword,
      email,
    });

    return account;
  }
}

export { CreateAccountUseCase };
