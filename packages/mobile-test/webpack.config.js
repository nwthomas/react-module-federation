const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, 'index.web.js')],
  mode: 'development',
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },

  // configures where the build ends up
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8085/',
  },

  devServer: {
    port: 8085,
    historyApiFallback: {
      index: '/web/public/index.html',
    },
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js'],
  },

  // ...the rest of your config

  module: {
    rules: [
      // This is needed for webpack to compile JavaScript.
      // Many OSS React Native packages are not compiled to ES5 before being
      // published. If you depend on uncompiled packages they may cause webpack build
      // errors. To fix this webpack can be configured to compile to the necessary
      // `node_module`.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '/index.web.js'),
          path.resolve(__dirname, 'node_modules/react-native-uncompiled'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
              'module:metro-react-native-babel-preset',
            ],
            plugins: ['react-native-web', '@babel/plugin-transform-runtime'],
          },
        },
      },

      // This is needed for webpack to import static images in JavaScript files.
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },

      // Handle TS and TSX files
      {
        test: /\.m?ts$|\.tsx?$/,
        // exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
          },
        },
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'mobile',
      filename: 'remoteEntry.js',
      exposes: {
        './MobileApp': './bootstrap',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'react-native-web': {
          singleton: true,
        },
        'react-native': {
          singleton: true,
          /**
           * add `requiredVersion` to fix: No required version specified and unable to automatically determine one.
           */
          requiredVersion: '^0.67.0',
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: './web/public/index.html',
    }),
  ],
};
