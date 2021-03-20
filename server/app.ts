import express from 'express';
import { matchRoutes } from 'react-router-config';
// import store from '../src/redux/store';
// import { store } from '@/store/store';
import store from '@/store/store';
// @ts-ignore
import logger from 'morgan';
// @ts-ignore
import cors from 'cors';
// import path from 'path';

import { routes } from '@/components/App/routes';
// eslint-disable-next-line import/no-unresolved
import render from './render';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/dist', express.static('dist'));
// app.use(express.static(path.resolve(__dirname, '../dist')));
// app.use('/img', express.static('img'));
app.get('*', async (req, res) => {
  // const actions = matchRoutes(routes, req.path)
  //   .map(({ route }) =>
  //     route.component.fetching
  //       ? route.component.fetching({ ...store, path: req.path })
  //       : null
  //   )
  //   .map(
  //     async (actions) =>
  //       // eslint-disable-next-line no-return-await
  //       await Promise.all(
  //         (actions || []).map(
  //           (p: any) =>
  //             p && new Promise((resolve) => p.then(resolve).catch(resolve))
  //         )
  //       )
  //   );
  //
  // await Promise.all(actions);
  const context = {};
  const content = render(req.path, store, context);

  res.send(content);
});

export default app;
