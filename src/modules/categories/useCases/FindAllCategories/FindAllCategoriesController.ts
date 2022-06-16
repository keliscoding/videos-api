import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';

class FindAllCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllCategoriesUseCase = container.resolve(
      FindAllCategoriesUseCase,
    );

    const categories = await findAllCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { FindAllCategoriesController };
