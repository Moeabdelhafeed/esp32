import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite:{
    plugins: [tailwindcss()]
  },
  css: ["~/assets/css/tailwind.css"],
  ssr: false,
  modules: ['@pinia/nuxt', "nuxt-bootstrap-icons"],
  app:{
    head:{
      link:[
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css' },
      ]
    }
  }
})