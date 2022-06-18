module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js",
    },
  },
};
