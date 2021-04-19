import { Router } from 'express';
import { feedbackService } from '../services/feedbackService';

export const feedbackRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const feedback = feedbackService();

  router.post('/create', feedback.createFeedback);
  router.get('/list', feedback.getFeedback);
  router.get('/remove', feedback.removeAllFeedback);

  apiRouter.use('/feedback', router);
};
