import React from 'react';

import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { ItemForum } from '@/pages/ItemForum';
import { SomeError } from '@/components/SomeError';
import { Autorization } from '@/pages/Autorization';
import { Registration } from '@/pages/Registration';
import { Game } from '@/pages/Game';

const Test = () => <h1>Capetown Game</h1>;

export const routes = [
  {
    path: '/',
    component: Test,
    isPrivate: true,
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
    path: '/autorization',
    component: Autorization,
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
