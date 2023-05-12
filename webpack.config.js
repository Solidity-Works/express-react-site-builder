import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname);

export default ({ config }) => ({
  ...config,
  entry: './src/index.ts',
  output: {
    ...config.output,
    filename: 'grapes.min.js',
    libraryExport: 'default',
  },
  devServer: {
    ...config.devServer,
    static: [rootDir],
    headers: { 'Access-Control-Allow-Origin': '*' },
    allowedHosts: 'all',
  },
  resolve: {
    ...config.resolve,
    modules: [
      ...(config.resolve && config.resolve.modules),
      'src'
    ],
    alias: {
      ...(config.resolve && config.resolve.alias),
      jquery: 'utils/cash-dom',
      backbone: `${rootDir}/node_modules/backbone`,
      underscore: `${rootDir}/node_modules/underscore`,
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({ __GJS_VERSION__: `'${pkg.version}'` }),
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: './index.html', // path to your HTML template file
    }),
  ]
});
