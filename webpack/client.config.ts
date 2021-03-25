import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import { isDev, filename, distDir, alias } from './env';
import jsLoader from './loaders/js';
import scssLoader from './loaders/scss';
import fontLoader from './loaders/font';
import imageLoader from './loaders/image';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

const entry: [string, ...string[]] = [
  path.resolve(__dirname, `../src/index.tsx`)
];

if (isDev) {
  entry.push('webpack-hot-middleware/client');
}

const clientConfig: Configuration = {
  mode: 'development',
  entry,
  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CssoWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/favicon.ico', to: '.' },
        { from: 'src/assets/game.png', to: './images' },
        { from: 'src/assets/robots.txt', to: '.' }
      ]
    }),
    new LoadablePlugin(),
    isDev ? new HotModuleReplacementPlugin() : ''
  ],
  output: {
    path: distDir,
    filename: filename('js'),
    publicPath: '/'
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
  },
  module: {
    rules: [
      jsLoader.client,
      scssLoader.client,
      fontLoader.client,
      imageLoader.client
    ]
  }
};

export default clientConfig;
