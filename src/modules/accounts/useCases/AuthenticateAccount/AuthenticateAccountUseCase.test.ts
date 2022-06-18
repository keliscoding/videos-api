import { AppError } from '@shared/errors/AppError';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { CreateAccountUseCase } from '../CreateAccount/CreateAccountUseCase';
import { AuthenticateAccountUseCase } from './AuthenticateAccountUseCase';

let accountRepositoryInMemory: IAccountsRepository;
let createAccountUseCase: CreateAccountUseCase;
let authenticateAccountUseCase: AuthenticateAccountUseCase;

describe('authenticate account use case', () => {
  beforeEach(() => {
    accountRepositoryInMemory = new AccountsRepositoryInMemory();
    createAccountUseCase = new CreateAccountUseCase(accountRepositoryInMemory);
    authenticateAccountUseCase = new AuthenticateAccountUseCase(
      accountRepositoryInMemory,
    );
  });

  it('should be able to log in an existent account', async () => {
    await createAccountUseCase.execute({
      username: 'user_test',
      email: 'user@example.com',
      password: 'password',
    });

    const result = await authenticateAccountUseCase.execute({
      email: 'user@example.com',
      password: 'password',
    });

    expect(result.account).toHaveProperty('id');
    expect(result).toHaveProperty('token');
  });

  it('should not be able to log in an account with incorrect email', async () => {
    await createAccountUseCase.execute({
      username: 'user_test2',
      email: 'user2@example.com',
      password: 'password',
    });

    expect(async () => {
      await authenticateAccountUseCase.execute({
        email: 'user@example.com',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to log in an account with incorrect password', async () => {
    await createAccountUseCase.execute({
      username: 'user_test3',
      email: 'user2@example.com',
      password: 'password',
    });

    expect(async () => {
      await authenticateAccountUseCase.execute({
        email: 'user3@example.com',
        password: 'pass',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
