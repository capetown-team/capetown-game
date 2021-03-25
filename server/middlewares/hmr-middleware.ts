import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack/client.config';

const compiler = webpack(config);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const publicPath: string =
  config.output && config.output.publicPath ? config.output.publicPath : '/';

export const hmrMiddleware = [
  devMiddleware(compiler, {
    serverSideRender: true,
    writeToDisk: (filePath) => /\.(html|css)$/.test(filePath),
    publicPath
  }),
  hotMiddleware(compiler)
];
