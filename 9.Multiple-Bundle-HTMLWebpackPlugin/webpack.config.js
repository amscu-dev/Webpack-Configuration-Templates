const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    product: "./src/products.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"), // __dirname -- Returnează calea directorului unde se află scriptul curent
    // --  este folosit în dezvoltarea locală pentru a asigura că Webpack generează fișierele bundle în locația corectă
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //  Specifică numele fișierului HTML care va fi generat în `dist/`
      template: path.resolve(__dirname, "src/index.html"), //  Folosește `src/index.html` ca template în loc să creeze un HTML default
      chunks: ["index"], //  Include DOAR `index.bundle.js` în acest HTML (evită încărcarea altor bundle-uri)
      inject: true, //  Injectează automat `<script>` pentru `index.bundle.js` în HTML generat ( În <head> cu defer )
    }),
    new HtmlWebpackPlugin({
      filename: "products.html",
      template: path.resolve(__dirname, "src/products.html"),
      chunks: ["product"],
      inject: true,
    }),
  ],
};
