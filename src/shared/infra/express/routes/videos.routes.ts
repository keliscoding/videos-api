import { Router } from 'express';

import { CreateVideoController } from '@modules/videos/useCases/CreateVideo/CreateVideoController';
import { FindAllVideosController } from '@modules/videos/useCases/FindAllVideos/FindAllVideosController';
import { FindVideoByIdController } from '@modules/videos/useCases/FindVideoById/FindVideoByIdController';
import { UpdateVideoController } from '@modules/videos/useCases/UpdateVideo/UpdateVideoController';
import { DeleteVideoController } from '@modules/videos/useCases/DeleteVideo/DeleteVideoController';
import { AddCategoriesToVideoController } from '@modules/videos/useCases/AddCategoriesToVideo/AddCategoriesToVideoController';
import { RemoveCategoryFromVideoController } from '@modules/videos/useCases/RemoveCategoryFromVideo/RemoveCategoryFromVideoController';
import { checkAuthentication } from '../middleware/checkAuthentication';
import { ShowFreeVideosController } from '@modules/videos/useCases/ShowFreeVideos/ShowFreeVideosController';

const videosRouter = Router();

const createVideoController = new CreateVideoController();
const findAllVideosController = new FindAllVideosController();
const findVideoByIdController = new FindVideoByIdController();
const updateVideoController = new UpdateVideoController();
const deleteVideoController = new DeleteVideoController();
const addCategoriesToVideoController = new AddCategoriesToVideoController();
const removeCategoryFromVideoController =
  new RemoveCategoryFromVideoController();
const showFreeVideosController = new ShowFreeVideosController();

videosRouter.get('/free', showFreeVideosController.handle);

videosRouter
  .post('/', checkAuthentication, createVideoController.handle)
  .get('/', checkAuthentication, findAllVideosController.handle);

videosRouter
  .get('/:id', checkAuthentication, findVideoByIdController.handle)
  .patch('/:id', checkAuthentication, updateVideoController.handle)
  .delete('/:id', checkAuthentication, deleteVideoController.handle)
  .post(
    '/:id/categories',
    checkAuthentication,
    addCategoriesToVideoController.handle,
  )
  .delete(
    '/:video_id/categories/:category_id',
    checkAuthentication,
    removeCategoryFromVideoController.handle,
  );

export { videosRouter };
