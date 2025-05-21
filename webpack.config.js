const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './application/src/index.js',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            /*{
                plugins: ['@babel/plugin-proposal-class-properties'],
              },*/
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './application/src/index.html',
      filename: './index.html',
    }),
   // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true, // Для обработки путей React Router
    hot: true,

    // open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // watch: true,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
