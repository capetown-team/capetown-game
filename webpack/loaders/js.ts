const jsRegex = /\.(js|jsx|tsx|ts)$/;

export default {
  client: {
    test: jsRegex,
    use: ['babel-loader'],
    exclude: /node_modules/
  },
  server: {
    test: jsRegex,
    use: { loader: 'babel-loader' },
    exclude: /node_modules/
  }
};
