import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { Helmet, HelmetData } from 'react-helmet';
import { AppState } from '../../src/reducers';
import { App } from '../../src/components/App';
import { store } from '../../src/store/store';
import { ROUTES } from '../../src/constants';

const getHtml = (
  reactHtml: string,
  state: AppState,
  helmetData: HelmetData
): string => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1230"/>
            <link rel="shortcut icon" type="image/png" href="favicon.ico">
            <link rel="stylesheet" href="main.css">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script src="/main.js"></script>
        </body>
      </html>
    `;

export const serverRenderMiddleware = (
  request: Request,
  response: Response
): void => {
  const location: string = request.url;

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={location}>
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

  response
    .status(pageIsAvailable ? 200 : 404)
    .send(getHtml(reactHtml, state, helmetData));
};
