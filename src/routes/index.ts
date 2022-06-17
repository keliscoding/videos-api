import { Router } from 'express';
import { accountsRouter } from './accounts.routes';

import { categoriesRouter } from './categories.routes';
import { videosRouter } from './videos.routes';

const router = Router();

router.use('/videos', videosRouter);
router.use('/categories', categoriesRouter);
router.use('/', accountsRouter);

export { router };
