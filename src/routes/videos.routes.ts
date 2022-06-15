import { Router } from 'express';

import { CreateVideoController } from '@src/videos/useCases/CreateVideo/CreateVideoController';
import { FindAllVideosController } from '@src/videos/useCases/FindAllVideos/FindAllVideosController';
import { FindVideoByIdController } from '@src/videos/useCases/FindVideoById/FindVideoByIdController';
import { UpdateVideoController } from '@src/videos/useCases/UpdateVideo/UpdateVideoController';
import { DeleteVideoController } from '@src/videos/useCases/DeleteVideo/DeleteVideoController';

const videosRouter = Router();

const createVideoController = new CreateVideoController();
const findAllVideosController = new FindAllVideosController();
const findVideoByIdController = new FindVideoByIdController();
const updateVideoController = new UpdateVideoController();
const deleteVideoController = new DeleteVideoController();

videosRouter
  .post('/', createVideoController.handle)
  .get('/', findAllVideosController.handle);

videosRouter
  .get('/:id', findVideoByIdController.handle)
  .patch('/:id', updateVideoController.handle)
  .delete('/:id', deleteVideoController.handle);

export { videosRouter };
