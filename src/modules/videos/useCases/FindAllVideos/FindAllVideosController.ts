import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllVideosUseCase } from './FindAllVideosUseCase';

class FindAllVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;
    const { limit, start } = request.query;

    const limitNumber = limit ? Number(limit) : 5;
    const startNumber = start ? Number(start) : 0;

    const findAllVideosUseCase = container.resolve(FindAllVideosUseCase);

    const { videos, count } = await findAllVideosUseCase.execute(
      startNumber,
      limitNumber,
      search ? (search as string) : '',
    );

    return response.json({
      videos,
      limit: limitNumber,
      startFrom: startNumber,
      count,
    });
  }
}

export { FindAllVideosController };
