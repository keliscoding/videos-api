import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';

class UpdateVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateVideoUseCase = container.resolve(UpdateVideoUseCase);
    const { id } = request.params;
    const { title, description, categories } = request.body;
    const data = await updateVideoUseCase.execute({
      id,
      title,
      description,
      categories,
    });

    return response.status(200).json(data);
  }
}

export { UpdateVideoController };
