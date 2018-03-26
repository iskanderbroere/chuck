const path = require("path")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob-all")

class NuxtCssExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}

module.exports = {
  mode: "spa",
  head: {
    title: "cn",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  build: {
    extractCSS: true,
    postcss: require("tailwindcss")("./tailwind.js"),
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, "./pages/**/*.vue"),
              path.join(__dirname, "./components/**/*.vue"),
              path.join(__dirname, "./layouts/**/*.vue")
            ]),
            extractors: [
              {
                extractor: NuxtCssExtractor,
                extensions: ["vue"]
              }
            ],
            whitelist: ["html", "body", "nuxt-progress"]
          })
        )
      }
    }
  }
}
