import { Router } from 'express';
import { forumRouter } from './forumRouter';
import { themeRouter } from './themeRouter';
import { themeManageRouter } from './themeManageRouter';

const apiRouter: Router = Router();

forumRouter(apiRouter);
themeRouter(apiRouter);
themeManageRouter(apiRouter);

export default apiRouter;
