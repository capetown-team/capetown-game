const imageRegex = /\.(jpe?g|png)(\?[a-z0-9=&.]+)?$/;

export default {
  client: {
    test: imageRegex,
    use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
  },
  server: {
    test: imageRegex,
    loader: 'null-loader'
  }
};
