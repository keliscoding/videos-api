import { Router } from 'express';

import { videosRouter } from './videos.routes';

const router = Router();

router.use('/videos', videosRouter);

export { router };
