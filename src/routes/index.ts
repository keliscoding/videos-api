import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { videosRouter } from './videos.routes';

const router = Router();

router.use('/videos', videosRouter);
router.use('/categories', categoriesRouter);

export { router };
