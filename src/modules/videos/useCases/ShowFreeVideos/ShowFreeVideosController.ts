import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowFreeVideosUseCase } from './ShowFreeVideosUseCase';

class ShowFreeVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showFreeVideosUseCase = container.resolve(ShowFreeVideosUseCase);

    const videos = await showFreeVideosUseCase.execute();

    return response.json(videos);
  }
}

export { ShowFreeVideosController };
