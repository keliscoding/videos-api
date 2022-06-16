import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/CreateCategory/CreateCategoryController';
import { FindAllCategoriesController } from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const findAllCategoriesController = new FindAllCategoriesController();

categoriesRouter
  .post('/', createCategoryController.handle)
  .get('/', findAllCategoriesController.handle);

export { categoriesRouter };
