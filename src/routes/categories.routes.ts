import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/CreateCategory/CreateCategoryController';
import { FindAllCategoriesController } from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesController';
import { FindCategoryByIdController } from '@modules/categories/useCases/FindCategoryById/FindCategoryByIdController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const findAllCategoriesController = new FindAllCategoriesController();
const findCategoryByIdController = new FindCategoryByIdController();

categoriesRouter
  .post('/', createCategoryController.handle)
  .get('/', findAllCategoriesController.handle);

categoriesRouter.get('/:id', findCategoryByIdController.handle);

export { categoriesRouter };
