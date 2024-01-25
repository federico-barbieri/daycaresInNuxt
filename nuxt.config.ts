// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxt/image", "@nuxtjs/supabase", 'nuxt-mapbox', 'nuxt-calendly'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/',
      exclude: [],
    }
  },
  mapbox: {
    accessToken: process.env.MAPBOX_KEY,
  },
  runtimeConfig: {
    public: {
      accessToken: process.env.MAPBOX_KEY,
 
    },
  },
  

 
})