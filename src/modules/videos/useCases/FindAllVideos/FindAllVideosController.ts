import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllVideosUseCase } from './FindAllVideosUseCase';

class FindAllVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllVideosUseCase = container.resolve(FindAllVideosUseCase);

    const data = await findAllVideosUseCase.execute();

    return response.json(data);
  }
}

export { FindAllVideosController };
