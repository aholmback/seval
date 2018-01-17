const path = require('path')
const key = require('../key.json')
const root = path.resolve(__dirname, '..') + '/'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = [
  {
    entry: './src/dist.js',
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')], { exclude: ['.keep']} ),
      new HtmlWebpackPlugin({
        filename: '../src/components/_preview.hbs',
        template: path.resolve(__dirname, 'src/components/_preview.html')
      })
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader?importLoaders=3',
            'postcss-loader?sourceMap=1',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.(html)$/,
          use: [
            'html-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    }
  },
  {
    target: 'node',
    externals: [nodeExternals({
      modulesDir: `${root}${key.server.path}node_modules`,
    })],
    entry: './src/templates.js',
    output: {
      filename: './templates/bundle.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          use: [ `handlebars-loader?rootRelative=${path.resolve(__dirname, 'src/components')}/` ]
        }
      ]
    }
  }
]
