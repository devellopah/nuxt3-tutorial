import devtoolsJson from 'vite-plugin-devtools-json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/course/chapter/1-chapter-1/**'],
      saveRedirectToCookie: true,
    }
  },

  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
      },
    },
    plugins: [
      // Only include devtools plugin in development
      ...(process.env.NODE_ENV === 'development' ? [devtoolsJson()] : []),
    ],
  },

  compatibilityDate: '2025-08-14',
});