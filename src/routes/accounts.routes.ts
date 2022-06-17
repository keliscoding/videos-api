import { Router } from 'express';

import { CreateAccountController } from '@modules/accounts/useCases/CreateAccount/CreateAccountController';

const accountsRouter = Router();

const createAccountController = new CreateAccountController();

accountsRouter.post('/register', createAccountController.handle);

export { accountsRouter };
