import { Router } from 'express';

import { CreateVideoController } from '@src/videos/useCases/CreateVideo/CreateVideoController';
import { FindAllVideosController } from '@src/videos/useCases/FindAllVideos/FindAllVideosController';
import { FindVideoByIdController } from '@src/videos/useCases/FindVideoById/FindVideoByIdController';

const videosRouter = Router();

const createVideoController = new CreateVideoController();
const findAllVideosController = new FindAllVideosController();
const findVideoByIdController = new FindVideoByIdController();

videosRouter
  .post('/', createVideoController.handle)
  .get('/', findAllVideosController.handle);

videosRouter.get('/:id', findVideoByIdController.handle);

export { videosRouter };
