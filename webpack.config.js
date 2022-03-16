const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    ui: './app/js/ui/ui.js',
    code: './app/js/code/code.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /(node_modules|bower_components)/,
        use: 'pug-loader',
      },
      { test: /\.(sass|scss|css)$/, use: ['style-loader', { loader: 'css-loader' }, 'sass-loader'] },
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
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
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ['.js$']),
  ],
});
