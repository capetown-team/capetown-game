import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import cookieParser from 'cookie-parser';

import { serverRenderMiddleware } from './middlewares/server-render-middleware';
import { serverUserAuthMiddleware } from './middlewares/server-user-auth-middleware';

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../sw.js'));
});

app.use(serverUserAuthMiddleware);
app.get('/*', serverRenderMiddleware);
