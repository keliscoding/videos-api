import bcryptjs from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { CreateAccountDTO } from '@shared/dtos/CreateAccountDTO';

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
  ) {}

  async execute({
    username,
    password,
    email,
  }: CreateAccountDTO): Promise<Account> {
    const lowercaseUsername = username.toLowerCase();
    const lowercaseEmail = email.toLowerCase();

    if (!lowercaseUsername) throw new AppError('missing username field');
    if (!password) throw new AppError('missing password field');
    if (!lowercaseEmail) throw new AppError('missing email field');

    const usernameExists = await this.accountRepository.findAccountByUsername(
      username,
    );
    if (usernameExists) throw new AppError('username already taken');

    const emailExists = await this.accountRepository.findAccountByEmail(email);
    if (emailExists) throw new AppError('email already taken');

    const encryptedPassword = await bcryptjs.hash(password, 10);

    const account = await this.accountRepository.create({
      username: lowercaseUsername,
      password: encryptedPassword,
      email: lowercaseEmail,
    });

    return account;
  }
}

export { CreateAccountUseCase };
