const fontRegex = /\.(woff|woff2|ttf|otf|eot)$/;

export default {
  client: {
    test: fontRegex,
    loader: 'file-loader'
  },
  server: {
    test: fontRegex,
    loader: 'null-loader'
  }
};
