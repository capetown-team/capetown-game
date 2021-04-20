import { Router } from 'express';
import { isAuthMiddleware } from '../../middlewares/server-user-auth-middleware';
import { themeManageService } from '../services/themeManageService';

export const themeManageRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const themeManage = themeManageService();

  router.post('/add', isAuthMiddleware, themeManage.addTheme);
  router.post('/view', isAuthMiddleware, themeManage.changeThemeView);
  router.post('/change', isAuthMiddleware, themeManage.changeTheme);

  apiRouter.use('/theme/manage', router);
};
