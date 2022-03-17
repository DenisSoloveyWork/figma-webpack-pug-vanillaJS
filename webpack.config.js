const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

let plugins = [
  new HtmlWebpackPlugin({
    template: './app/pug/index.pug',
    filename: 'ui.html',
    inject: 'body',
    chunks: ['ui'],
  }),
];

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ['.js$']))
}

module.exports = {
  mode: mode,
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
  plugins: plugins,
};
