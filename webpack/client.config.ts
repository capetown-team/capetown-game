import path from 'path';
import { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isDev, filename, distDir, alias } from './env';
import jsLoader from './loaders/js';
import scssLoader from './loaders/scss';
import fontLoader from './loaders/font';
import imageLoader from './loaders/image';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

const clientConfig: Configuration = {
  mode: 'development',
  entry: path.join(__dirname, `../src/index.tsx`),
  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CssoWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/favicon.ico', to: '.' },
        { from: 'src/assets/robots.txt', to: '.' }
      ]
    })
  ],
  output: {
    path: distDir,
    filename: filename('js'),
    publicPath: ''
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
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
