import { Request, Response } from 'express';
import { themeManageRepository } from '../../db/repositories/themeManageRepository';
import sequelize, { modelTheme } from '../../db/init/db_init';

export const themeManageService = () => {
  const themesManage = themeManageRepository(sequelize, modelTheme);

  const addTheme = (req: Request, res: Response) => {
    const { name, data, hidden } = req.body;

    if (!name || !data) {
      res.status(400).json({
        error: {
          type: 'parameter invalid',
          data: 'incorrect name or content length'
        }
      });
    }

    themesManage
      .add(name, data, Boolean(hidden))
      .then(() => res.status(200))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const changeThemeView = (req: Request, res: Response) => {
    const { themeId, view } = req.body;

    if (!themeId || !view) {
      res.status(400).json({
        error: {
          type: 'parameter invalid',
          data: 'incorrect name or content length'
        }
      });
    }

    themesManage
      .view(themeId, view)
      .then(() => res.status(200))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const changeTheme = (req: Request, res: Response) => {
    const { themeId, data } = req.body;

    if (!themeId || !data) {
      res.status(400).json({
        error: {
          type: 'parameter invalid',
          data: 'incorrect name or content length'
        }
      });
    }

    themesManage
      .change(themeId, data)
      .then(() => res.status(200))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  return {
    addTheme,
    changeThemeView,
    changeTheme
  };
};
