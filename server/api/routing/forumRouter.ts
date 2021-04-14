import { Router } from 'express';
import { isAuthMiddleware } from '../../middlewares/server-user-auth-middleware';
import { forumService } from '../services/forumService';

export const forumRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const forum = forumService();

  router.get('/topics', isAuthMiddleware, forum.getTopics);
  router.get('/topic/:id', isAuthMiddleware, forum.getComments);
  router.post('/topic', isAuthMiddleware, forum.addTopic);

  router.post('/comment', isAuthMiddleware, forum.addComment);
  router.get('/comment/:id', isAuthMiddleware, forum.getReplies);

  router.post('/reply', isAuthMiddleware, forum.addReply);

  router.get('/emotion/:id', isAuthMiddleware, forum.getEmotions);

  apiRouter.use('/forum', router);
};
