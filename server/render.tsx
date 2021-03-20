import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
// @ts-ignore
import serialize from 'serialize-javascript';
// import { AnyAction } from 'redux';
// import { AppState } from '@/reducers';
// import { HelmetData } from 'react-helmet';

import { routes } from '@/components/App/routes';

export default (pathname: any, store: any, context: any) => {
  const content = renderToString(
    <Provider store={store}>
      {/*<StaticRouter location={pathname} context={context}>*/}
      <StaticRouter location={pathname}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
  	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title>Title</title>
		</head>
		<body>
			<div id="app">
				${content}
			</div>
			<script>
				window.__INITIAL_STATE__ = ${serialize(store.getState()).replace(
          /</g,
          '\\u003c'
        )}
			</script
			<script src="./dist/main.js"></script>
		</body>
	</html>
  `;
};
