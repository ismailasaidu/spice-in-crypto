const fs = require("fs");
const path = require("path");

const configPath = path.resolve("node_modules/react-scripts/config/webpack.config.js");

try {
  let content = fs.readFileSync(configPath, "utf8");

  // Replace CssMinimizerPlugin with a version that ignores CSS parse errors
  if (!content.includes("warningsFilter")) {
    content = content.replace(
      /new CssMinimizerPlugin\(\{/,
      `new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
        warningsFilter: () => false,`
    );

    fs.writeFileSync(configPath, content, "utf8");
    console.log("✅ CssMinimizerPlugin patched successfully!");
  } else {
    console.log("⚠️ CssMinimizerPlugin already patched.");
  }
} catch (err) {
  console.error("❌ Failed to patch CssMinimizerPlugin:", err);
}
