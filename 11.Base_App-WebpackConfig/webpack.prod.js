// Importăm modulele necesare
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin"); // Plugin pentru copierea fișierelor dintr-o locație în alta
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Plugin pentru extragerea CSS-ului din JavaScript
const PurgeCss = require("purgecss-webpack-plugin"); // Plugin pentru eliminarea CSS-ului neutilizat din proiect (Optimizare)
const glob = require("glob"); // Folosit pentru căutarea recursivă a fișierelor dintr-un folder
const { merge } = require("webpack-merge"); // Combină configurațiile Webpack
const commonConfig = require("./webpack.common"); // Configurația comună pentru development și production

// Specificăm calea către codul sursă pentru pluginul PurgeCSS
const purgePath = {
  src: path.join(__dirname, "src"),
};

// Exportăm configurația pentru modul `production`
module.exports = merge(commonConfig, {
  // Combină configurația comună cu cea de producție
  mode: "production", // Activează optimizările pentru build-ul final

  module: {
    rules: [
      {
        test: /\.css$/, // Aplică regula pentru fișierele `.css`
        use: [
          MiniCssExtractPlugin.loader, // Extrage CSS-ul într-un fișier separat
          "css-loader", // Permite importarea fișierelor CSS în JavaScript
        ],
      },
      {
        test: /\.s[ac]ss$/, // Aplică regula pentru fișierele `.scss` și `.sass`
        use: [
          MiniCssExtractPlugin.loader, // Extrage CSS-ul din JS și îl salvează într-un fișier separat
          "css-loader", // Interpretează fișierele CSS
          "sass-loader", // Compilează fișierele `.scss` și `.sass` în CSS simplu
        ],
      },
    ],
  },

  plugins: [
    //  Plugin pentru copierea imaginilor din `src/assets/images/` în folderul `dist/`
    new CopyPlugin({
      patterns: [
        {
          from: path // Calea către imaginile din proiectul sursă
            .resolve(__dirname, "src/assets/images/*")
            .replace(/\\/g, "/"), // Transformă backslash-urile din Windows în slash-uri compatibile cu Linux/MacOS
          to: path.resolve(__dirname, "dist").replace(/\\/g, "/"), // Destinația fișierelor copiate
          context: "src", // Definește punctul de referință pentru căile relative
        },
      ],
    }),

    //  Plugin pentru eliminarea CSS-ului neutilizat
    new PurgeCss({
      paths: glob.sync(`${purgePath.src}/**/*`, { nodir: true }), // Scanează toate fișierele din folderul `src`
      safelist: ["dummy-css"], // Clase CSS care nu trebuie eliminate chiar dacă nu sunt detectate ca fiind utilizate
    }),

    //  Plugin pentru extragerea CSS-ului într-un fișier separat cu hash pentru caching mai eficient
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Folosește hashing pentru cache busting (ex: index.12345.css)
    }),
  ],
});
