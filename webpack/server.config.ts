import path from 'path';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

import { alias } from './env';
import jsLoader from './loaders/js';
import scssLoader from './loaders/scss';
import fontLoader from './loaders/font';
import imageLoader from './loaders/image';

const serverConfig: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(__dirname, '../server/server'),
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
    path: path.join(__dirname, '../dist'),
    publicPath: ''
  },
  resolve: {
    alias,
    // plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })]
};

export default serverConfig;
