import { Router } from 'express';

import { CreateAccountController } from '@modules/accounts/useCases/CreateAccount/CreateAccountController';
import { AuthenticateAccountController } from '@modules/accounts/useCases/AuthenticateAccount/AuthenticateAccountController';

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateAccountController = new AuthenticateAccountController();

accountsRouter.post('/register', createAccountController.handle);
accountsRouter.post('/login', authenticateAccountController.handle);

export { accountsRouter };
