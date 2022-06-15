import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteVideoUseCase } from './DeleteVideoUseCase';

class DeleteVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteVideoUseCase = container.resolve(DeleteVideoUseCase);
    const { id } = request.params;

    await deleteVideoUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteVideoController };
