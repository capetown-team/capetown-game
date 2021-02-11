import React from 'react';

import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { SomeError } from '@/components/SomeError';
import { Autorization } from '@/pages/Autorization';
import { Registration } from '@/pages/Registration';

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
    isPrivate: true
  },
  {
    path: '/autorization',
    component: Autorization,
    isPrivate: false
  },
  {
    path: '/registration',
    component: Registration,
    isPrivate: false
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
