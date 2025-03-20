import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";

// Necesare pentru compatibilitate cu __dirname și __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurarea Webpack folosind ESM (export default)
export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true, // Curăță folderul dist la fiecare build
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Aplicăm regula pentru fișierele CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/, // Aplicăm regula pentru fișierele JavaScript
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Template HTML pe care îl folosește Webpack
    }),
  ],
};
