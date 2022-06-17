import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAccountUseCase } from './CreateAccountUseCase';

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAccountUseCase = container.resolve(CreateAccountUseCase);

    const { username, email, password } = request.body;

    const account = await createAccountUseCase.execute({
      username,
      email,
      password,
    });

    return response.status(201).json(account);
  }
}

export { CreateAccountController };
