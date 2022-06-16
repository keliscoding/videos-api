import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title } = request.body;

    const updateCategoryController = container.resolve(UpdateCategoryUseCase);

    await updateCategoryController.execute({ id, title });

    return response.send();
  }
}

export { UpdateCategoryController };
