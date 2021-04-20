import { Router } from 'express';
import { isAuthMiddleware } from '../../middlewares/server-user-auth-middleware';
import { themeService } from '../services/themeService';

export const themeRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const theme = themeService();

  router.get('/list', isAuthMiddleware, theme.getThemeList);
  router.get('/:id', isAuthMiddleware, theme.getTheme);
  router.post('/change', isAuthMiddleware, theme.changeUserTheme);

  apiRouter.use('/theme', router);
};
