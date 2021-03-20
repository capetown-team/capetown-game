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
  },
  {
    name: 'Лидеры',
    linkTo: ROUTES.LEADERBOARD
  },
  {
    name: 'post',
    linkTo: '/post'
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
  },
  {
    name: 'post',
    linkTo: '/post'
  }
];
