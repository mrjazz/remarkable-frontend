const webpack = require('webpack');

// put all styles in file, better for production mode
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // entry: './src/index.js',
  entry: ['react-hot-loader/patch', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           url: false
      //         }
      //       }
      //     ]
      //   })
      // },      
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'main.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ExtractTextPlugin("styles.css"),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: { // need for SPA url rewrites
      index: '/index.html'
    },
  }
};
