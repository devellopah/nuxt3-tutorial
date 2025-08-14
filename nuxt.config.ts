import devtoolsJson from 'vite-plugin-devtools-json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/course/chapter/1-chapter-1/**'],
      cookieRedirect: true,
    }
  },

  vite: {
    plugins: [
      // Only include devtools plugin in development
      ...(process.env.NODE_ENV === 'development' ? [devtoolsJson()] : []),
    ],
  },

  compatibilityDate: '2025-08-14',
});