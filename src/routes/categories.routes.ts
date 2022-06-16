import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/CreateCategory/CreateCategoryController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

export { categoriesRouter };
