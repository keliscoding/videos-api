import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/CreateCategory/CreateCategoryController';
import { FindAllCategoriesController } from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesController';
import { FindCategoryByIdController } from '@modules/categories/useCases/FindCategoryById/FindCategoryByIdController';
import { UpdateCategoryController } from '@modules/categories/useCases/UpdateCategory/UpdateCategoryController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const findAllCategoriesController = new FindAllCategoriesController();
const findCategoryByIdController = new FindCategoryByIdController();
const updateCategoryController = new UpdateCategoryController();

categoriesRouter
  .post('/', createCategoryController.handle)
  .get('/', findAllCategoriesController.handle);

categoriesRouter
  .get('/:id', findCategoryByIdController.handle)
  .patch('/:id', updateCategoryController.handle);

export { categoriesRouter };
