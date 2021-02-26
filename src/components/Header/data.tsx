import { ROUTES } from '@/constants';

export type LinkType = {
  exact?: boolean;
  name: string;
  linkTo: string;
};

export const overLinks: LinkType[] = [
  {
    name: 'Авторизация',
    linkTo: ROUTES.SIGNIN
  },
  {
    name: 'Регистрация',
    linkTo: ROUTES.SIGNUP
  }
];

export const userLinks: LinkType[] = [
  {
    exact: true,
    name: 'Главная',
    linkTo: ROUTES.ROOT
  },
  {
    name: 'Игра',
    linkTo: ROUTES.GAME
  },
  {
    name: 'Лидеры',
    linkTo: ROUTES.LEADERBOARD
  },
  {
    name: 'Форум',
    linkTo: ROUTES.FORUM
  }
];
