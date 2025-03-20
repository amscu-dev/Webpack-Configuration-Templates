const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

// Exportăm configurația Webpack ca obiect
module.exports = {
  // Definim punctele de intrare ale aplicației - 2 pagini: index și courses
  entry: {
    index: "./src/index.js", // Fișierul principal pentru pagina principală
    courses: "./src/pages/courses.js", // Fișierul principal pentru pagina de cursuri
  },

  // Configurarea output-ului (ieșirea) build-ului
  output: {
    filename: "[name].[contenthash].js", // Bundle-urile generate vor avea nume dinamice bazate pe conținut (pentru cache busting)
    path: path.resolve(__dirname, "dist"), // Toate fișierele generate vor fi salvate în folderul `dist`
    clean: true, // Șterge tot conținutul folderului `dist` înainte de fiecare build nou
  },

  // Modulele - reguli pentru încărcarea fișierelor cu diverse extensii
  module: {
    rules: [
      {
        test: /\.(png|jpeg|jpg|gif)$/, // Verifică toate fișierele de tip imagine
        type: "asset/resource", // Salvează fișierele ca resurse independente în folderul specificat de `assetModuleFilename`
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, // Transformă imaginile mai mici de 50KB în coduri base64 pentru a reduce numărul de request-uri HTTP
          },
        },
      },
    ],
  },

  // Pluginuri utilizate pentru diverse funcționalități adiționale
  plugins: [
    // Asigură compatibilitatea ( ES Modules ) cu librării vechi care folosesc jQuery și moment.js
    new webpack.ProvidePlugin({
      mnt: "moment", // Exportă `moment` ca variabilă globală `mnt` pentru utilizare ușoară în fișiere JS
      $: "jquery", // Exportă `jQuery` ca variabilă globală `$` pentru compatibilitate cu librării ce o folosesc
    }),

    // Crează fișierul HTML principal `index.html` bazat pe template-ul existent
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Template-ul HTML folosit pentru această pagină
      chunks: ["index"], // Include DOAR codul generat din `index.js` în această pagină HTML
      filename: "index.html", // Salvează fișierul generat cu acest nume în `dist/`
    }),

    // Crează fișierul HTML pentru pagina de cursuri `courses.html`
    new HtmlWebpackPlugin({
      template: "./src/pages/courses.html", // Template-ul HTML pentru pagina de cursuri
      chunks: ["courses"], // Include DOAR codul generat din `courses.js` în această pagină HTML
      filename: "courses.html", // Salvează fișierul generat cu acest nume în `dist/`
      base: "pages", // Setează URL-ul de bază pentru această pagină (util dacă faci routing intern)
    }),
  ],

  // Optimizarea bundle-urilor pentru performanță mai bună
  optimization: {
    splitChunks: {
      chunks: "all", // Separă codul comun în bundle-uri separate pentru a minimiza dimensiunea fișierelor principale
    },
  },
};
