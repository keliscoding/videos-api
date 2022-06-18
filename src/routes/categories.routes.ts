import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/CreateCategory/CreateCategoryController';
import { FindAllCategoriesController } from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesController';
import { FindCategoryByIdController } from '@modules/categories/useCases/FindCategoryById/FindCategoryByIdController';
import { UpdateCategoryController } from '@modules/categories/useCases/UpdateCategory/UpdateCategoryController';
import { DeleteCategoryController } from '@modules/categories/useCases/DeleteCategory/DeleteCategoryController';
import { FindVideosByCategoryController } from '@modules/videos/useCases/FindVideosByCategory/FindVideosByCategoryController';
import { checkAuthentication } from '@src/middleware/checkAuthentication';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const findAllCategoriesController = new FindAllCategoriesController();
const findCategoryByIdController = new FindCategoryByIdController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
//maybe out of place?
const findVideosByCategoryController = new FindVideosByCategoryController();

categoriesRouter
  .post('/', checkAuthentication, createCategoryController.handle)
  .get('/', checkAuthentication, findAllCategoriesController.handle);

categoriesRouter
  .get('/:id', checkAuthentication, findCategoryByIdController.handle)
  .patch('/:id', checkAuthentication, updateCategoryController.handle)
  .delete('/:id', checkAuthentication, deleteCategoryController.handle)
  .get(
    '/:id/videos',
    checkAuthentication,
    findVideosByCategoryController.handle,
  );

export { categoriesRouter };
