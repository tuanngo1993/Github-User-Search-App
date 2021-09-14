// Webpack uses this to work with directories
const path = require("path");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin its work
  // babel-polyfill is required to get async/await working
  entry: ["babel-polyfill", "./src/javascript/index.js"],

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "bundle.js",
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript
  // minifying and other things, so let's set mode to development
  mode: "development",

  watch: true,

  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          // Using file-loader for these files
          loader: "url-loader",

          // In options we can set different things like format
          // and directory to save
        },
      },
    ],
  },
};
