const path = require("path");

module.exports = {
  publicPath: "./",

  configureWebpack: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@api": path.resolve(__dirname, "src/api"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@plugins": path.resolve(__dirname, "src/plugins"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },

  transpileDependencies: [
    'vuetify'
  ]
};
