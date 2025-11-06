import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./assets/css/main.css"],

  modules: ["@pinia/nuxt"],

  nitro: {
    routeRules: {
      "/api/**": {
        proxy: "https://naukatv.ru/api/**",
      },
    },
  },

  vite: {
    plugins: [tailwindcss(), svgLoader({ svgo: false, defaultImport: "component" })],
  },
});
