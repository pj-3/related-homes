const path = require('path');
const src_dir = path.join(__dirname, 'client', 'src');
const public_dir = path.join(__dirname, 'client', 'public')

module.exports = {
  mode: "development",
  entry: `${src_dir}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: public_dir,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  devtool: "source-map"
};