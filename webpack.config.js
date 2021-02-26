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
      path.resolve(__dirname, 'src'), 'node_modules',
    ],
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    loaders: [
      {
        exclude: ['node_modules'], loader: 'babel-loader', test: /\.jsx?$/, options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
      },
      { loader: 'style-loader!css-loader', test: /\.css$/ },
      { loader: 'url-loader', test: /\.gif$/},
      { loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
    ],
    rules: [
    ],
  },
};
