module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      exclude: ["_redirects"],
    },
  },
};
