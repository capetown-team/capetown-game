import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import { serverRenderMiddleware } from './middlewares/server-render-middleware';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', serverRenderMiddleware);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
