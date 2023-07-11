const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Create HTML template from index.html file
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      // Create manifest.json file for app
      new WebpackPwaManifest({
        publicPath: "./",
        short_name: "J.A.T.E.",
        name: "J.A.T.E. - Just Another Text Editor",
        icons: [
          {
            // Add required icons from logo.png provided
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
            
          },
        ],
        orientation: "portrait",
        display: "standalone",
        start_url: "./",
        description: "Web-based text editor used to track code snippets",
        background_color: "green",
        theme_color: "green",
        fingerprints: false,  // Don't include the hash value in the filename
      }),
      // Create Service Worker from src-sw.js file
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      })
    ],

    module: {
      rules: [
        {
          // Include CSS files in build
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // Include image files in build
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: "asset/resource",
        },
        {
          // Use babel to interpret different versions of JS
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
