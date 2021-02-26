const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
    ],
  },
};
