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

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../sw.js'));
});

app.get('/*', serverRenderMiddleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${port}`);
});
