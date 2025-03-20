const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/, //  Corectat pentru a potrivi doar extensii `.css`
        use: [
          { loader: "style-loader" }, //  Injectează CSS-ul în DOM
          {
            loader: "css-loader",
            options: { modules: true }, //  Activează CSS Modules -- a se pastra ordinea aceasta exacta! loaders se executa de la dreapta la stanga ;
          },
        ],
      },
    ],
  },
};
