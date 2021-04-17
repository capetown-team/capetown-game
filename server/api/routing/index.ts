import { Router } from 'express';
import { forumRouter } from './forumRouter';
import { themeRouter } from './themeRouter';

const apiRouter: Router = Router();

forumRouter(apiRouter);
themeRouter(apiRouter);

export default apiRouter;
