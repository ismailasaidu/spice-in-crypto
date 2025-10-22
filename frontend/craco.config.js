const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 🔥 Remove the CSS Minimizer Plugin that’s breaking your build
      webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
        (plugin) => !(plugin instanceof CssMinimizerPlugin)
      );

      console.log("✅ CSS Minimizer Plugin disabled successfully");
      return webpackConfig;
    },
  },
};
