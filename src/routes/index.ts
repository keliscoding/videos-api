import { Router } from 'express';

import { videosRouter } from './videos.routes';

const router = Router();

router.use('/api/videos', videosRouter);

export { router };
