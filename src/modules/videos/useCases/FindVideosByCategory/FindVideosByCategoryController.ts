import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindVideosByCategoryUseCase } from './FindVideosByCategoryUseCase';

class FindVideosByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { limit, start } = request.query;

    const limitNumber = limit ? Number(limit) : 5;
    const startNumber = start ? Number(start) : 0;

    const findVideosByCategoryUseCase = container.resolve(
      FindVideosByCategoryUseCase,
    );

    const { videos, count } = await findVideosByCategoryUseCase.execute(
      id,
      limitNumber,
      startNumber,
    );

    return response.json({
      videos,
      limit: limitNumber,
      startFrom: startNumber,
      count,
    });
  }
}

export { FindVideosByCategoryController };
