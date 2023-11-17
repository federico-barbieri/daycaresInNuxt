<script setup>


import { supabase } from '../lib/supabaseClient.js'
import { onMounted, ref, toRefs } from 'vue'

import DaycareCard from "../components/DaycareCard.vue"

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const name = ref('')
const fetchedFullName = ref('')

const daycares = ref([])

onMounted(() => {
  getProfile()
  getDaycares()
})

async function getDaycares(){

let { data: fetchedDaycares, error } = await supabase
  .from('daycares')
  .select('*')

  daycares.value = fetchedDaycares

}

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`full_name`)
      .eq('id', user.id)

    if (error && status !== 406) throw error

    if (data && data.length > 0) {
    fetchedFullName.value = data[0].full_name;
    }

    
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      full_name: name.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}


// tabs from nuxt ui

const items = [{
  slot: 'daycares',
  label: 'Browse daycares'
}, {
  slot: 'children',
  label: 'My children'
}]


</script>

<template>
    <div class="main">


<!-- IF THIS IS THE FIRST TIME THE USER LOGGED IN, THEY WILL BE ASKED TO PROVIDE A NAME-->

  <form v-if="!fetchedFullName" class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" v-model="name" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>


<!-- ELSE, WE WILL ALREADY HAVE THEIR NAME-->


  <h1 class="font-sans" v-else>HELLO {{fetchedFullName}}</h1>

  <UTabs :items="items" class="w-full" orientation="vertical">
    <template #daycares="{ item }">

      <ul v-if="daycares.length > 0" class="daycare-ul">
   
        <UCard v-for="daycare in daycares" :key="daycare.id" class="newCard">
            <template #header>
              <h2><strong>{{ daycare.name }}</strong></h2>
            </template>

            <div>
              <p class="address"><em>{{ daycare.address }}</em></p>
              <span class="area">{{ daycare.area }}</span>
            </div>


            <template #footer>
              <butto class="moreInfoBtn">More Info</butto>
            </template>
        </UCard>
      </ul> 
    
    
    </template>
  </UTabs>
  
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

.daycare-ul{
  padding-inline-start: 0;
    color: white;
    max-width: 70%;
    height: auto;
    list-style: none;
    height: 600px; /* Set a fixed height or adjust as needed */
    overflow-y: auto; /* Enable vertical scrolling */
    padding: 1rem;
}

.newCard{
  margin: 1.5rem 0;
  border: 1px solid white;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
}

.moreInfoBtn{
    width: 8rem;
    height: 2rem;
    margin: 2rem 0 0 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.5s ease-in;
}

.moreInfoBtn:hover{
    background-color: hotpink;
    color: black;
}


</style>