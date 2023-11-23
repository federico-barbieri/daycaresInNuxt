// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxt/image", "@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/login',
      exclude: [],
    }
  }

 
})