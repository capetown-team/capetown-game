import { Router } from 'express';
import { forumRouter } from './forumRouter';

const apiRouter: Router = Router();

forumRouter(apiRouter);

export default apiRouter;
