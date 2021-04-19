import { Router } from 'express';
import { forumRouter } from './forumRouter';
import { themeRouter } from './themeRouter';
import { themeManageRouter } from './themeManageRouter';
import { feedbackRouter } from './feedbackRouter';

const apiRouter: Router = Router();

forumRouter(apiRouter);
themeRouter(apiRouter);
themeManageRouter(apiRouter);
feedbackRouter(apiRouter);

export default apiRouter;
