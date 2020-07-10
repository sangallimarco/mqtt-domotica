const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: [ '.ts', '.ts', '.js' ],
  },
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'build'),
  },
};