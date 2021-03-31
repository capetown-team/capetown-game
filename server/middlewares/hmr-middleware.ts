import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack/client.config';

const compiler = webpack(config);

export const hmrMiddleware = [
  devMiddleware(compiler, {
    serverSideRender: true,
    writeToDisk: (filePath) => /\.(html|css)$/.test(filePath),
    publicPath:
      config.output && config.output.publicPath
        ? String(config.output.publicPath)
        : '/'
  }),
  hotMiddleware(compiler)
];
