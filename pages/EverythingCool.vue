<script setup>


// supabase 

import { supabase } from '../lib/supabase.js'


const loading = ref(false)
const email = ref('')


const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}





// bar chart 
import BarChart from '../components/BarChart.vue'


// main navigation array

const items = [
  {
  label: 'Home',
  slot: 'home'
  }, 
  {
  label: 'Overview',
  slot: 'problematic'
  }, 
  {
  label: 'Types of institutions',
  slot: 'institutions'
  }, 
  {
  label: 'About us',
  slot: 'about'
  },
  {
  label: 'Contact',
  slot: 'contact'
  }
]


// institutions array


const institutions = [
  {
  label: 'Montessori',
  slot: 'montessori'
  }, 
  {
  label: 'Rudolph Steiner',
  slot: 'steiner'
  }, 
  {
  label: 'International',
  slot: 'international'
  }
]

// about us - FAQ array


const faq = [
  {
  label: 'Why are public daycares not included? ',
  content: 'The public system evaluates and analyses many different variables regarding the whole family.'
  }, 
  {
  label: 'Does it cost money to use the platform?',
  content: 'No. Using the platform is totally free.'
  }, 
  {
  label: 'How many sign ups can I have?',
  content: 'You can sign up your children to as many waiting lists as you want.'
  }
]


</script>

<template>
  <div class="w-screen h-screen  m-0 p-0  w-screen h-screen font-mono">
  
    <header class=" mx-auto  w-screen h-full m-0 p-0">
        <nav class="mx-auto  w-screen h-full p-0 flex flex-col text-center">

          <p class="font-sans pt-10 pb-5 text-5xl">REBØRN</p>

          <UTabs :ui="{ list: { tab: { background: '' } } }" :items="items"  orientation="horizontal" class="container mx-auto text-center h-full place-content-center pt-5 w-10/12" >
      
                <template #home="{ item }" >

                    <div class="container mx-auto flex flex-col items-center" style="height: 90vh; display: flex; align-items: center; justify-content: flex-start; ">
                      
                    

                          <h1 class="mt-10" style="font-size: 5rem;">Waiting lists for private daycares in Copenhagen</h1>

                          <p class="mt-5 text-lg">
                            Sign up your children in an easy and transparent way.
                          </p>

                          <form class="row flex-center flex mt-10 text-center" @submit.prevent="handleLogin">
                                    <div class="col-6 form-widget">
                                      <div>
                                        <input class="inputField border border-black-500" required type="email" placeholder="Your email" v-model="email" />
                                      </div>
                                      <div>
                                        <input
                                          type="submit"
                                          class="button block cursery text-center dark:bg-white-500 dark:text-white"
                                          :value="loading ? 'Loading' : 'Give me access'"
                                          :disabled="loading"
                                        />
                                      </div>
                                    </div>
                            </form>


                    </div>  

                </template>

                <template #problematic="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-row items-center" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div>

                      <h2 style="font-size: 3rem; max-width: 40vw; text-align: left">DAYCARE OVERVIEW IN COPENHAGEN</h2>

                      <div class="text-left mt-5" style="max-width: 60ch">

                        <p class="mb-2">
                        Many want to sign their children into private daycares. The problem is there is not enough place for everyone.
                      </p>

                      <p class="mb-2">
                        To make things worse, signing children is a manual task and not very intuitive.
                      </p>

                      <p>
                        Rebørn by Waitly makes it easy.
                      </p>
                        
                        
                      </div>
                      
                      
                      
                    </div>


                        <BarChart />

                  </div>


                </template>

                <template #institutions="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-row items-center" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div>

                      <h2 style="font-size: 3rem; max-width: 40vw; text-align: left" class="mr-5">TYPES OF INSTITUTIONS</h2>

                      <p class="text-left mt-5" style="max-width: 60ch">
                        Many institutions have their own methodologies. 
                        Other follow specific beliefs. 

                        Click on each tab to see more information. 
                      </p>
                      
                    
                    </div>


                    <UTabs :items="institutions"  orientation="vertical" class="container mx-auto w-2/5 px-3 mx-3">

                      <template #montessori="{ item }">
                        
                          <p class="text-left pt-3">
                            Montessori is a method of education that is based on self-directed activity, 
                            hands-on learning and collaborative play. In Montessori classrooms children make 
                            creative choices in their learning, while the classroom and the highly trained teacher 
                            offer age-appropriate activities to guide the process.
                          </p>
                        
                      </template>

                      <template #steiner="{ item }">
                        
                        <p class="text-left pt-3">
                          Steiner teachers aim to create an environment that facilitates children´s 
                          self-directed free play. In Steiner philosophy, free play supports the proper development 
                          of the will, and children are trusted to work out identities, relationships, 
                          fantasy and reality for themselves through play.
                        </p>
                      
                    </template>

                    <template #international="{ item }">
                        
                        <p class="text-left pt-3">
                          Focuses on the 4 domains of learning: Social and Emotional Development, Language Development, 
                          Cognitive Development and Physical Development. learning and growth in these areas are encouraged 
                          by offering developmentally appropriate learning experiences.  
                        </p>
                      
                    </template>
                    
                    </UTabs>

                    </div>


                </template>

                <template #about="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-row items-center" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div class="mr-10">
                    

                      <h2 style="font-size: 3rem; max-width: 40vw; text-align: left" class="mr-5">ABOUT US</h2>

                      <p class="text-left mt-5 mb-3" style="max-width: 50ch">
                        Rebørn is an initiative by Waitly.dk. 
                      </p>

                      <p class="text-left mt-5 mb-3" style="max-width: 50ch">
                        It's name comes from <strong>reimagining</strong> how parents 
                        can access waiting lists combined with <strong><em>børn</em></strong>, 
                        the word for <strong><em>children</em></strong> in Danish.
                        
                      </p>
                        
                      <p class="text-left mt-5 mb-3" style="max-width: 50ch">
                        Its aim is to make the daycare category more accessible and transparent.
                      </p>

                      <p class="text-left mt-5 mb-3" style="max-width: 50ch">
                        Click on each tab to see frequently asked questions. 
                      </p>

                    </div>

                      <UAccordion :ui="{item: { color: 'text-black-500'}}" :items="faq"  orientation="vertical" class="container mx-auto w-2/5 px-3 mx-3 text-left">
                        
                      
                      </UAccordion>

                   
                  </div>


                </template>

                <template #contact="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-col items-center" style="height: 70vh; display: flex; align-items: center; justify-content: center;">


                    <h2 style="font-size: 3rem; max-width: 40vw; text-align: left" class="mr-5">CONTACT</h2>

                    <p class="text-left mt-5 mb-3" style="max-width: 50ch">
                      reborn-waitinglists@gmail.com
                    </p>

                    <p>
                      Or give us a call Monday to Friday from 9 to 13.
                    </p>


                  </div>

                </template>




          </UTabs>
          
          
          
        </nav>

      

      </header>
  
  
  </div>
</template>

<style scoped>

.my-custom-tabs .list {
  background-color: transparent;
}


.cursery{
    cursor: pointer;
}

.custom-bg {
    background-image: url('../assets/pige.jpg');
  }


</style>