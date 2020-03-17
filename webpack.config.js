const path = require('path');
const src_dir = path.join(__dirname, 'client', 'src')
const public_dir = path.join(__dirname, 'client', 'public')

module.exports = {
  mode: "development",
  // context: __dirname,
  entry: path.join(src_dir, 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  }
}