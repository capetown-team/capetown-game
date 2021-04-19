import { Router } from 'express';
import { forumRouter } from './forumRouter';
import { feedbackRouter } from './feedbackRouter';

const apiRouter: Router = Router();

forumRouter(apiRouter);
feedbackRouter(apiRouter);

export default apiRouter;
