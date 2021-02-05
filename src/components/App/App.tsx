import React from 'react';
import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';

import './App.scss';

export const App = () => (
  <div className="app">
    <Leaders />
    <Forum />
  </div>
);
