module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[ext]/[hash][ext]", //  Toate asset-urile vor fi plasate în foldere bazate pe extensia lor
    clean: true, //  Șterge fișierele vechi la fiecare build
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/, //  Imagini
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]", //  Salvează imaginile în `dist/images/`
        },
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/, //  Fonturi
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]", //  Salvează fonturile în `dist/fonts/`
        },
      },
      {
        test: /\.(mp4|webm|mp3|wav|ogg)$/, //  Fișiere media
        type: "asset/resource",
        generator: {
          filename: "media/[hash][ext]", //  Salvează fișierele media în `dist/media/`
        },
      },
    ],
  },
};

// Opțiunea generator în Webpack este folosită pentru a personaliza modul în care sunt generate și salvate fișierele gestionate de asset/resource, asset/inline și asset.
// assetModuleFilename este o setare globală pentru toate fișierele gestionate de asset/resource și asset.
//  Dacă nu ai un generator.filename pentru un anumit asset, Webpack va folosi assetModuleFilename.
// generator.filename permite setarea unui nume de fișier specific pentru fiecare regulă de module.rules
// Dacă un fișier se potrivește unei reguli care are generator.filename, Webpack ignoră assetModuleFilename și folosește această setare.
