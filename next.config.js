/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.giphy.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  transpilePackages: ["@babel/preset-react"],
  output: "standalone",
  sentry: {
    hideSourceMaps: true,
  },
  swcMinify: true,
};

const sentryWebpackPluginOptions = {
  silent: true,
};

const plugins = [withSentryConfig];
// For every plugin we want to use, we need to pass the config to it
module.exports = () =>
  plugins.reduce((config, plugin) => {
    // Check if plugin is withSentryConfig
    if (plugin.name === "withSentryConfig") {
      return plugin(config, sentryWebpackPluginOptions);
    }
    return plugin(config);
  }, nextConfig);
