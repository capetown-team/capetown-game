import path from 'path';
import React from 'react';
import { Action } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ThunkAction } from 'redux-thunk';
import { StaticRouter, matchPath } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Helmet, HelmetData } from 'react-helmet';
import { Request, Response } from 'express';
import { ChunkExtractor } from '@loadable/server';
import serialize from 'serialize-javascript';
import url from 'url';

import { routes } from '@/components/App/routes';
import { store } from '@/store/store';
import { State } from '@/reducers';
import { UserType } from '@/reducers/user/types';
import { authorize } from '@/reducers/user/actions';
import { ROUTES } from '@/constants';
import { IApi } from '@/middlewares/api';
import { App } from '@/components/App';

const getHtml = (
  reactHtml: string,
  state: State,
  helmetData: HelmetData,
  extractor: ChunkExtractor
): string => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1230"/>
            <link rel="shortcut icon" type="image/png" href="./favicon.ico">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            ${extractor.getStyleTags()}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
              window.__INITIAL_STATE__ = ${serialize(state)}
            </script>
            ${extractor.getScriptTags()}
        </body>
      </html>
    `;

export const serverRenderMiddleware = async (
  request: Request,
  response: Response
) => {
  if (response.locals.user) {
    const user: { user: UserType } = { user: response.locals.user };
    await store.dispatch(authorize(user));
  }

  const { cookies } = response.locals;
  const location: string = request.path;
  const context: StaticRouterContext = {};

  const statsFile = path.resolve(__dirname, 'loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });

  const renderApp = () => {
    const jsx = extractor.collectChunks(
      <ReduxProvider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );

    const reactHtml = renderToString(jsx);
    const helmetData = Helmet.renderStatic();
    const pageIsAvailable = (Object.values(ROUTES) as string[]).includes(
      request.path
    );
    const state = store.getState();

    if (context.url) {
      response.redirect(context.url);
      return;
    }

    response
      .status(pageIsAvailable ? context.statusCode || 200 : 404)
      .send(getHtml(reactHtml, state, helmetData, extractor));
  };

  const dataRequirements: ThunkAction<
    void,
    () => void,
    IApi,
    Action<string>
  >[] = [];

  routes.some((route) => {
    const { fetchData } = route;
    const match = matchPath<{ slug: string }>(
      url.parse(location).pathname as string,
      route
    );

    if (match && fetchData) {
      dataRequirements.push(
        fetchData({
          dispatch: store.dispatch,
          cookies,
          match
        })
      );
    }

    return Boolean(match);
  });

  return Promise.all(dataRequirements)
    .then(() => {
      renderApp();
    })
    .catch((err) => {
      throw err;
    });
};
