const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

let mode = process.env.NODE_ENV;

module.exports = {
  mode: mode,
  target: 'browserslist',
  devtool: mode === 'production' ? false : 'inline-source-map',
  entry: {
    ui: './app/js/ui/ui.js',
    code: './app/js/code/code.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'pug-loader',
      },
      { test: /\.(sass|scss|css)$/, use: ['style-loader', { loader: 'css-loader' }, 'sass-loader'] },
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/pug/index.pug',
      filename: 'ui.html',
      inject: 'body',
      chunks: ['ui'],
      cache: false
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ['.js$']),
  ],
};