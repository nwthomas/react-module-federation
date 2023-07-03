const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Specify the output directory path
    filename: "main.js", // Specify the output bundle filename
  },
  devServer: {
    port: 8081,
  },
  historyApiFallback: {
    index: "index.html",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

const mergedConfig = merge(commonConfig, devConfig);

module.exports = mergedConfig;
