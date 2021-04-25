import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import cookieParser from 'cookie-parser';
import { expressCspHeader, INLINE, SELF, DATA } from 'express-csp-header';

import { serverRenderMiddleware } from './middlewares/server-render-middleware';
import { serverUserAuthMiddleware } from './middlewares/server-user-auth-middleware';
import { hmrMiddleware } from './middlewares/hmr-middleware';

import apiRouter from './api/routing';

import { isDev } from '../webpack/env';

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../sw.js'));
});

if (isDev) {
  app.use(hmrMiddleware);
}

app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'https://ya-praktikum.tech'],
      'script-src': [SELF, INLINE, 'https://ya-praktikum.tech'],
      'style-src': [SELF, INLINE],
      'img-src': [DATA, SELF, INLINE, 'https://ya-praktikum.tech'],
      'worker-src': [SELF],
      'block-all-mixed-content': true
    }
  })
);

app.use(serverUserAuthMiddleware);
app.use('/api', apiRouter);
app.get('/*', serverRenderMiddleware);
