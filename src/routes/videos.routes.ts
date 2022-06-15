import { Router } from 'express';
import { CreateVideoController } from '@src/videos/useCases/CreateVideo/CreateVideoController';
import { FindAllVideosController } from '@src/videos/useCases/FindAllVideos/FindAllVideosController';

const videosRouter = Router();

const createVideoController = new CreateVideoController();
const findAllVideosController = new FindAllVideosController();

videosRouter.post('/', createVideoController.handle);
videosRouter.get('/', findAllVideosController.handle);

export { videosRouter };
