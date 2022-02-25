const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",

  entry: {
    content: "./src/app/Content.ts",
    background: "./src/app/Background.ts",
    popup: "./src/ui/popup.tsx",
    listener: "./src/app/Listener.ts",
  },

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  }
};
