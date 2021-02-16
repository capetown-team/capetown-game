export type LinkType = {
  name: string;
  linkTo: string;
};

export const overLinks: LinkType[] = [
  {
    name: 'Авторизация',
    linkTo: '/autorization'
  },
  {
    name: 'Регистрация',
    linkTo: '/registration'
  }
];

export const userLinks: LinkType[] = [
  {
    name: 'Главная',
    linkTo: '/'
  },
  {
    name: 'Игра',
    linkTo: '/game'
  },
  {
    name: 'Лидеры',
    linkTo: '/leaders'
  },
  {
    name: 'Форум',
    linkTo: '/forum'
  }
];
