<script setup>

import { supabase } from '../lib/supabaseClient.js'

let email = ref(null);

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: 'http://localhost:3000/Account',
    },
  })
}

</script>

<template>
  <div class="main">

                <form class="row flex-center flex" @submit.prevent="signInWithEmail">
                                      <div class="col-6 form-widget">
                                          <h1 class="header">I SHOULD BE THE FIRST PAGE</h1>
                                          <p class="description">Sign in via magic link with your email below</p>
                                      
                                  
                                      <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
                                      
                                        <button type="submit">SEND</button>
                                 
                                </div>
                                
                </form>

  </div>
</template>

<style scoped>

.main{
    width: 90vw;
    height: auto;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 5rem auto;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 1rem;
}

h1{
  border: 1px solid red;
}



</style>