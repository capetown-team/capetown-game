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
// import { matchRoutes, renderRoutes } from 'react-router-config';

import url from 'url';
import { routes } from '@/components/App/routes';
import { AppState, getInitialState } from '../../src/reducers';
import { App } from '../../src/components/App';
// import { store } from '../../src/store/store';
import { configureStore } from '../../src/store/store';
// import { ROUTES } from '../../src/constants';
import { IApi } from '../../src/middlewares/api';

const getHtml = (
  reactHtml: string,
  state: AppState,
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
              window.__INITIAL_STATE__ = ${JSON.stringify(state)}
            </script>
            ${extractor.getScriptTags()}
            
        </body>
      </html>
    `;

// ${extractor.getScriptTags()}

export const serverRenderMiddleware = (
  request: Request,
  response: Response
) => {
  // const context = {};
  const context: StaticRouterContext = {};
  const location: string = request.url;

  const statsFile = path.resolve(__dirname, 'loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const { store } = configureStore(getInitialState(location), location);
  // console.log('--', context);

  const renderApp = () => {
    const jsx = extractor.collectChunks(
      <ReduxProvider store={store}>
        <StaticRouter location={location} context={context}>
          {/*<StaticRouter location={location} context={context}>*/}
          {/*{renderRoutes(routes)}*/}
          <App />
        </StaticRouter>
      </ReduxProvider>
    );

    const reactHtml = renderToString(jsx);
    const helmetData = Helmet.renderStatic();
    // const pageIsAvailable = (Object.values(ROUTES) as string[]).includes(
    //   request.path
    // );
    const state = store.getState();

    if (context.url) {
      response.redirect(context.url);
      return;
    }

    response
      // .status(pageIsAvailable ? 200 : 404)
      .status(context.statusCode || 200)
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
          match
        })
      );
    }

    return Boolean(match);
  });

  // const actions = matchRoutes(routes, request.path)
  //   .map(({ route }) =>
  //     route.component.fetching
  //       ? route.component.fetching({ ...store, path: request.path })
  //       : null
  //   )
  //   .map(
  //     async (actions) =>
  //       // eslint-disable-next-line no-return-await
  //       await Promise.all(
  //         (actions || []).map(
  //           (p) => p && new Promise((resolve) => p.then(resolve).catch(resolve))
  //         )
  //       )
  //   );

  // renderApp();
  // return (
  return (
    Promise.all(dataRequirements)
      // return Promise.all(actions)
      .then(() => {
        // console.log('data', ...data);
        renderApp();
      })
      .catch((err) => {
        throw err;
      })
  );

  // await Promise.all(actions);
  // renderApp();
};
