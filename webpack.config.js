const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    home: path.resolve(__dirname, './client/src/pages/home/Home.jsx'),
    thread: path.resolve(__dirname, './client/src/pages/thread/Thread.jsx'),
    login: path.resolve(__dirname, './client/src/pages/login/Login.jsx'),
    signup: path.resolve(__dirname, './client/src/pages/signup/SignUp.jsx'),
    mycomments: path.resolve(__dirname, './client/src/pages/mycomments/MyComments.jsx'),
    usersettings: path.resolve(__dirname, './client/src/pages/usersettings/UserSettings.jsx')
  },
  output: {
    path: path.resolve(__dirname, './client/dist/bundles'),
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js[x]?/,
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
