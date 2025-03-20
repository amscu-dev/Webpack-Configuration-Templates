const path = require("path"); //  Importă modulul `path` pentru a gestiona căile fișierelor

module.exports = {
  entry: "./src/index.js", //  Fișierul de intrare (punctul de start al aplicației)
  output: {
    filename: "bundle.js", //  Numele fișierului JavaScript generat după build
    path: path.resolve(__dirname, "dist"), //  Creează calea absolută pentru directorul `dist`
  },
  module: {
    rules: [
      {
        test: /\.(css)$/, //  Regula care se aplică tuturor fișierelor `.css`
        use: [
          { loader: "style-loader" }, //  Injectează CSS-ul în DOM ca `<style>` în `<head>`
          {
            loader: "css-loader",
            options: { modules: true }, //  Activează CSS Modules (clasele CSS vor fi hash-uite)
          },
        ],
      },
      {
        test: /\.s[ac]ss$/, //  Regula care se aplică fișierelor `.scss` și `.sass`
        use: [
          { loader: "style-loader" }, //  Injectează CSS-ul în `<head>` (similar cu regula pentru CSS)
          {
            loader: "css-loader",
            options: { modules: true }, //  Activează CSS Modules și pentru SCSS/SASS
          },
          { loader: "sass-loader" }, //  Compilează SASS/SCSS în CSS înainte de a fi procesat de `css-loader`
        ],
      },
    ],
  },
};
