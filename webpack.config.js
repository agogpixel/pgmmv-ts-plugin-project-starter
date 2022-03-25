/* eslint-disable @typescript-eslint/no-var-requires */
const { iifeReturnMinify, IIFEReturnPlugin } = require('@agogpixel/pgmmv-webpack-support');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const package = require('./package.json');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const pluginName = package.name.includes('/') ? package.name.split('/')[1] : package.name;
const version = isProd ? package.version : `${package.version}-dev`;

const srcPath = resolve(__dirname, 'src');
const distPath = resolve(__dirname, 'dist');

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: false,
  entry: {
    [`${pluginName}-${version}`]: `${srcPath}/pgmmv-entry.ts`
  },
  output: {
    iife: true,
    filename: '[name].pgmmv.js',
    path: distPath,
    environment: {
      arrowFunction: false
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json'
            }
          },
          'source-map-loader'
        ],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.md$/i,
        type: 'asset/source'
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: function comments(node, comment) {
              // leave for minifier
              return /IIFEReturnPlugin/.test(comment.value);
            },
            max_line_len: 255
          }
        },
        minify: iifeReturnMinify
      })
    ]
  },
  plugins: [new IIFEReturnPlugin()]
};
