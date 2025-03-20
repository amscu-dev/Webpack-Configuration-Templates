const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EsLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  // Setarea modului de dezvoltare - ofera mesaje de eroare mai detaliate si dezactivarea minificarii pentru debugging mai usor
  mode: "development",

  // Definirea punctului de intrare principal al aplicatiei
  entry: path.resolve(__dirname, "src/index.js"),

  // Setarea iesirii - fisierul bundle final generat si locatia sa
  output: {
    filename: "[name].bundle.js", // Numele fisierului generat - [name] va fi inlocuit cu numele bundle-ului (ex: index.bundle.js)
    path: path.resolve(__dirname, "dist"), // Locatia unde va fi salvat bundle-ul
  },

  plugins: [
    // ESLint Plugin - Ruleaza ESLint pentru a verifica si corecta erorile de sintaxa din cod
    new EsLintPlugin(),

    // HtmlWebpackPlugin - Genereaza fisierul HTML pe baza unui template si injecteaza bundle-urile generate
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Fisierul HTML sursa folosit ca template
      filename: "index.html", // Numele fisierului HTML generat in dist/
    }),

    // MiniCssExtractPlugin - Extrage CSS-ul din JavaScript si il salveaza separat pentru a imbunatati performanta
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // Directorul unde ruleaza serverul local
    },
    port: 9000, // Portul pe care ruleaza aplicatia
    open: true, // Deschide automat browserul la pornirea serverului
    historyApiFallback: true, // Permite folosirea React Router fara erori de refresh
  },

  module: {
    rules: [
      {
        // Transpilarea fisierelor JavaScript si JSX folosind Babel
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults", // Targeteaza browserele moderne uzuale
                  },
                ],
                "@babel/preset-react", // Permite transpilarea JSX in JavaScript valid
              ],
            },
          },
          {
            // ESLint Loader - Verifica codul JS/JSX pentru erori la build-time
            loader: "eslint-loader",
            options: {
              fix: true, // Corecteaza automat erorile ESLint unde este posibil
            },
          },
        ],
      },
      {
        // Procesarea fisierelor CSS folosind PostCSS
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]], // Suport pentru functionalitati CSS moderne
              },
            },
          },
        ],
      },
      {
        // Procesarea fisierelor SASS/SCSS
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader", // Converteste SASS/SCSS in CSS
        ],
      },
      {
        // Incarcarea imaginilor ca resurse
        test: /\.(jpg|png|jpeg|gif)$/,
        type: "asset/resource", // Copiaza fisierele in folderul de build si le referentiaza in codul final
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all", // Imparte codul comun in bundle-uri separate pentru a imbunatati performanta
    },
  },
};
