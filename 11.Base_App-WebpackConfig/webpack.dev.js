// Importăm modulele necesare
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // Plugin pentru analizarea dimensiunii bundle-ului
const { merge } = require("webpack-merge"); // Librărie pentru combinarea configurațiilor Webpack
const commonConfig = require("./webpack.common"); // Importăm configurația comună pentru toate modurile (development și production)

// Exportăm configurația Webpack pentru modul `development`
module.exports = merge(commonConfig, {
  // Combinăm `commonConfig` cu configurația curentă pentru development
  mode: "development", // Modul de dezvoltare, oferă un build mai rapid și fără minimizări ale codului

  // Configurarea serverului de dezvoltare (Webpack Dev Server)
  devServer: {
    static: "./dist", // Servește fișierele din folderul `dist` (unde se află codul generat)
  },

  // Regulile pentru încărcarea diferitelor tipuri de fișiere
  module: {
    rules: [
      {
        test: /\.css$/, // Se aplică pentru fișierele `.css`
        use: ["style-loader", "css-loader"],
        // `style-loader`: Injectează CSS-ul în DOM sub formă de taguri `<style>`
        // `css-loader`: Interpretează importurile și URL-urile din CSS
      },
      {
        test: /\.s[ac]ss$/, // Se aplică pentru fișierele `.scss` și `.sass`
        use: ["style-loader", "css-loader", "sass-loader"],
        // `style-loader`: Injectează CSS-ul în DOM
        // `css-loader`: Permite importarea fișierelor CSS în JavaScript
        // `sass-loader`: Compilează fișierele `.scss` și `.sass` în CSS
      },
    ],
  },

  // Pluginuri utilizate pentru dezvoltare
  plugins: [
    new BundleAnalyzerPlugin({}),
    // Plugin pentru analizarea bundle-ului generat. Deschide automat un raport în browser
    // unde poți vedea toate modulele incluse și dimensiunea fiecăruia.
  ],
});
