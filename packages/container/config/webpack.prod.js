const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const marketingDomain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${marketingDomain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

const mergedConfig = merge(commonConfig, prodConfig);

module.exports = mergedConfig;
