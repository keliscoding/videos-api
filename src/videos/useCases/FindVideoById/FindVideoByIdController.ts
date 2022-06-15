import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindVideoByIdUseCase } from './FindVideoByIdUseCase';

class FindVideoByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findVideoByIdUseCase = container.resolve(FindVideoByIdUseCase);

    const data = await findVideoByIdUseCase.execute(id);

    return response.json(data);
  }
}

export { FindVideoByIdController };
