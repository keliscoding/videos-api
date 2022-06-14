import { Router } from 'express';
import { CreateVideoController } from '@src/videos/useCases/CreateVideo/CreateVideoController';

const videosRouter = Router();

const createVideoController = new CreateVideoController();

videosRouter.post('/', createVideoController.handle);

export { videosRouter };
