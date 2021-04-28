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

  router.post('/emotion', isAuthMiddleware, forum.addEmotion);
  router.get('/emotions', isAuthMiddleware, forum.getEmotions);

  router.get('/users', isAuthMiddleware, forum.getUsers);
  router.post('/user', forum.addUser);

  apiRouter.use('/forum', router);
};
