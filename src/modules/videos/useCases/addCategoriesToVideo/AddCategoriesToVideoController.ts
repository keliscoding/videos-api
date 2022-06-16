import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AddCategoriesToVideoUseCase } from './AddCategoriesToVideoUseCase';

class AddCategoriesToVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: video_id } = request.params;
    const { categories: categories_id } = request.body;

    const addCategoriesToVideosUseCase = container.resolve(
      AddCategoriesToVideoUseCase,
    );

    const video = await addCategoriesToVideosUseCase.execute({
      video_id,
      categories_id,
    });

    return response.json(video);
  }
}

export { AddCategoriesToVideoController };
