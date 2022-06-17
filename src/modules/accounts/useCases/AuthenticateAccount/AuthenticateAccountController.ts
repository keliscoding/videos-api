import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateAccountUseCase } from './AuthenticateAccountUseCase';

class AuthenticateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateAccountUseCase = container.resolve(
      AuthenticateAccountUseCase,
    );

    const { token, account } = await authenticateAccountUseCase.execute({
      email,
      password,
    });

    const formatedResponse = {
      token,
      account: {
        username: account.username,
        email: account.email,
      },
    };

    return response.json(formatedResponse);
  }
}

export { AuthenticateAccountController };
