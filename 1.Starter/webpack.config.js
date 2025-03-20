const path = require("path");

module.exports = {
  entry: "./src/index.js", // Punctul de intrare
  output: {
    filename: "bundle.js", // Numele fișierului final
    path: path.resolve(__dirname, "./dist"), // Unde va fi salvat bundle-ul
    publicPath: "dist/", // specificam URL relativ pentru URL-ul asset urilor statice. Pentru fisierele locale acest lucru vine out-of-the-box, in schimb cand avem incarcarea fisierelor intr-un mod dinamic de pe server(sau CDN), avem nevoie sa configuram acest aspect
    // publicPath: "https://some-cdn.com/" - exemplu pentru incarcarea aseturilor dinamic
    // https://cdn.mysite.com/bundle.js
    // https://cdn.mysite.com/images/a1b2c3.png
    assetModuleFilename: "images/[hash][ext]", // Asset-urile generate se vor salva intr-un folder dedicat, numele lor va fii hash-uit si extensia originala se va pastra.
    clean: true, //  șterge tot conținutul din folderul dist/ înainte de fiecare build, păstrând doar fișierele generate în build-ul curent.
  },
  mode: "none", // Nu aplică optimizări (nici development, nici production)
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/, // Pentru aceste tipologii de fisiere se va aplica implicit asset module urmator:
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10KB  - acest threshold va stabilit ce tipologie de asset module vom folosi (asset/resource sau asset/inline)
          },
        },
      },
    ],
  },
};
