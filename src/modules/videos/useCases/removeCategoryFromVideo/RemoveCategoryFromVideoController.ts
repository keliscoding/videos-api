import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RemoveCategoryFromVideoUseCase } from './RemoveCategoryFromVideoUseCase';

class RemoveCategoryFromVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, video_id } = request.params;

    const removeCategoryFromVideoUseCase = container.resolve(
      RemoveCategoryFromVideoUseCase,
    );

    await removeCategoryFromVideoUseCase.execute({ category_id, video_id });

    return response.status(204).send();
  }
}

export { RemoveCategoryFromVideoController };
