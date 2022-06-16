import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindVideosByCategoryUseCase } from './FindVideosByCategoryUseCase';

class FindVideosByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findVideosByCategoryUseCase = container.resolve(
      FindVideosByCategoryUseCase,
    );

    const videos = await findVideosByCategoryUseCase.execute(id);

    return response.json(videos);
  }
}

export { FindVideosByCategoryController };
