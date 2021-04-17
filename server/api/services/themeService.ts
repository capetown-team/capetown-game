import { Request, Response } from 'express';
import { themeRepository } from '../../db/repositories/themeRepository';
import sequelize, { modelTheme, modelUserTheme } from '../../db/init/db_init';

export const themeService = () => {
  const themes = themeRepository(sequelize, modelTheme, modelUserTheme);

  const getThemeList = (req: Request, res: Response) => {
    themes
      .getAll()
      .then((themes) => res.status(200).json(themes))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const getTheme = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      res.status(400).json({
        error: {
          type: 'parameter error',
          data: 'invalid parametr id'
        }
      });
    }

    themes
      .get(Number(id))
      .then((theme) => res.status(200).json(theme))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const changeUserTheme = (req: Request, res: Response) => {
    const { userId, themeId } = req.body;

    if (
      (!userId || Number.isNaN(Number(userId))) &&
      (!themeId || Number.isNaN(Number(themeId)))
    ) {
      res.status(400).json({
        error: {
          type: 'parameter error',
          data: 'invalid parametr id'
        }
      });
    }

    themes
      .get(Number(userId))
      .then((theme) => {
        if (!theme) {
          return themes.add(Number(userId), Number(themeId));
        }

        return themes.change(Number(userId), Number(themeId));
      })
      .then(() => themes.get(Number(userId)))
      .then((theme) => res.status(200).json(theme))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  return {
    getThemeList,
    getTheme,
    changeUserTheme
  };
};
