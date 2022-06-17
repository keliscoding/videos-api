import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllVideosUseCase } from './FindAllVideosUseCase';

class FindAllVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const findAllVideosUseCase = container.resolve(FindAllVideosUseCase);

    if (search) {
      const data = await findAllVideosUseCase.execute(search as string);
      return response.json(data);
    }

    const data = await findAllVideosUseCase.execute();

    return response.json(data);
  }
}

export { FindAllVideosController };
