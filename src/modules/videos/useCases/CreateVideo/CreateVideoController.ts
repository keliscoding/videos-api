import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateVideoUseCase } from './CreateVideoUseCase';

class CreateVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, url, categories } = request.body;

    const createVideoUseCase = container.resolve(CreateVideoUseCase);

    const newVideo = await createVideoUseCase.execute({
      title,
      description,
      url,
      categories,
    });

    return response.status(201).json(newVideo);
  }
}

export { CreateVideoController };
