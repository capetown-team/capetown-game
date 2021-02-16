import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { ItemForum } from '@/pages/ItemForum';
import { Profile } from '@/pages/Profile';
import { SomeError } from '@/components/SomeError';
import { Authorization } from '@/pages/Authorization';
import { Registration } from '@/pages/Registration';
import { Game } from '@/pages/Game';
import { Landing } from '@/pages/Landing';

export const routes = [
  {
    path: '/',
    component: Landing,
    isPrivate: false,
    exact: true
  },
  {
    path: '/leaders',
    component: Leaders,
    isPrivate: true
  },
  {
    path: '/forum',
    component: Forum,
    exact: true,
    isPrivate: true
  },
  {
    path: '/forum/:id',
    component: ItemForum,
    exact: true,
    isPrivate: true
  },
  {
    path: '/game',
    component: Game,
    isPrivate: true
  },
  {
    path: '/authorization',
    component: Authorization,
    isPrivate: false,
    exact: true
  },
  {
    path: '/registration',
    component: Registration,
    isPrivate: false,
    exact: true
  },
  {
    path: '/profile',
    component: Profile,
    isPrivate: true
  },
  {
    path: '/error',
    component: SomeError,
    isPrivate: false
  },
  {
    path: '*',
    component: SomeError,
    isPrivate: false
  }
];
