<script setup>
import { onMounted, ref } from 'vue'
import Account from '@/pages/Account.vue'
import { supabase } from './lib/supabaseClient.js'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container">
    
   

        <Account v-if="session" :session="session" />
        <nuxtPage v-else />

      
  </div>
</template>
