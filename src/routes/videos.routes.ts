import { Router } from 'express';

import { CreateVideoController } from '@modules/videos/useCases/CreateVideo/CreateVideoController';
import { FindAllVideosController } from '@modules/videos/useCases/FindAllVideos/FindAllVideosController';
import { FindVideoByIdController } from '@modules/videos/useCases/FindVideoById/FindVideoByIdController';
import { UpdateVideoController } from '@modules/videos/useCases/UpdateVideo/UpdateVideoController';
import { DeleteVideoController } from '@modules/videos/useCases/DeleteVideo/DeleteVideoController';
import { AddCategoriesToVideoController } from '@modules/videos/useCases/addCategoriesToVideo/AddCategoriesToVideoController';
import { RemoveCategoryFromVideoController } from '@modules/videos/useCases/removeCategoryFromVideo/RemoveCategoryFromVideoController';

const videosRouter = Router();

const createVideoController = new CreateVideoController();
const findAllVideosController = new FindAllVideosController();
const findVideoByIdController = new FindVideoByIdController();
const updateVideoController = new UpdateVideoController();
const deleteVideoController = new DeleteVideoController();
const addCategoriesToVideoController = new AddCategoriesToVideoController();
const removeCategoryFromVideoController =
  new RemoveCategoryFromVideoController();

videosRouter
  .post('/', createVideoController.handle)
  .get('/', findAllVideosController.handle);

videosRouter
  .get('/:id', findVideoByIdController.handle)
  .patch('/:id', updateVideoController.handle)
  .delete('/:id', deleteVideoController.handle)
  .post('/:id/categories', addCategoriesToVideoController.handle)
  .delete(
    '/:video_id/categories/:category_id',
    removeCategoryFromVideoController.handle,
  );

export { videosRouter };
