import React from 'react';

import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { ItemForum } from '@/pages/ItemForum';
import { Profile } from '@/pages/Profile';
import { SomeError } from '@/components/SomeError';
import { Autorization } from '@/pages/Autorization';
import { Registration } from '@/pages/Registration';
import { Game } from '@/pages/Game';

const Test = () => (
  <div>
    Экран игры занимает собой лабиринт, коридоры которого заполнены точками.
    Задача игрока — управляя Пакманом, съесть все точки в лабиринте, избегая
    встречи с привидениями, которые гоняются за героем. В начале каждого уровня
    призраки находятся в недоступной Пакману прямоугольной комнате в середине
    уровня, из которой они со временем освобождаются. Если привидение дотронется
    до Пакмана, то его жизнь теряется, призраки и Пакман возвращаются на
    исходную позицию, но при этом прогресс собранных точек сохраняется. Если при
    столкновении с призраком у Пакмана не осталось дополнительных жизней, то
    игра заканчивается. После съедения всех точек начинается новый уровень в том
    же лабиринте. По бокам лабиринта находятся два входа в один туннель, при
    вхождении в который Пакман и призраки выходят с другой стороны лабиринта
  </div>
);

export const routes = [
  {
    path: '/',
    component: Test,
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
