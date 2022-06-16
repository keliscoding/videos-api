import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

class FindCategoryByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCategoryByIdUseCase = container.resolve(FindCategoryByIdUseCase);

    const category = await findCategoryByIdUseCase.execute(id);

    return response.json(category);
  }
}

export { FindCategoryByIdController };
