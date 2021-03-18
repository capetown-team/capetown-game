import path from 'path';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import { alias } from './env';
import jsLoader from './loaders/js';
import scssLoader from './loaders/scss';
import fontLoader from './loaders/font';
import imageLoader from './loaders/image';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LoadablePlugin = require('@loadable/webpack-plugin');

const serverConfig: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.resolve(__dirname, '../server/server'),
  plugins: [new LoadablePlugin()],
  module: {
    rules: [
      jsLoader.server,
      scssLoader.server,
      fontLoader.server,
      imageLoader.server
    ]
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
  },
  devtool: 'source-map',
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })]
};

export default serverConfig;
