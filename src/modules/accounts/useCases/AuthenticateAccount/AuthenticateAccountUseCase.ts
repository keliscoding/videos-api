import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';

interface IRequest {
  username?: string;
  email?: string;
  password: string;
}

interface IResponse {
  account: {
    username: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const account = await this.accountRepository.findAccountByEmail(email);

    if (!account) throw new AppError('email or password invalid');

    const passwordEncrypted = account.password;

    const passwordMatches = await bcryptjs.compare(password, passwordEncrypted);

    if (!passwordMatches) throw new AppError('email or password invalid');

    const token = jwt.sign({}, 'willSwitchLater', {
      subject: account.id,
      expiresIn: '1d',
    });

    return {
      account,
      token,
    };
  }
}

export { AuthenticateAccountUseCase };
