<script setup>


// supabase 

import { supabase } from '../lib/supabase.js'


const loading = ref(false)
const email = ref('')
const password = ref('')


const handleLogin = async () => {
  try {
    loading.value = true

    let { data, error } = await supabase.auth.signInWithOtp({
        email: email.value,
})

    
    if (error) throw error
    alert('Check your email for the login link!')
  } 
  catch (error) {
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
  
  //{
  //label: 'Types of institutions',
  //slot: 'institutions'
  //}, 
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


// measure viewport's width

const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
};

const handleResize = () => {
      updateWindowWidth();
};

onMounted(() => {
      window.addEventListener('resize', handleResize);
    });


</script>

<template>
  <div 
  class="w-screen h-screen m-0 p-0 font-mono" 
  :style="{
  'background-color': '#35354A', 
  color: 'white', 
  height: windowWidth < 768 ? 'auto' : '100vh', 
  overflow: 'hidden',
  }">
  
    <header class=" mx-auto  w-screen h-full m-0 p-0">
        <nav class="mx-auto  w-screen h-full p-0 flex flex-col text-center">

          <p class="font-sans pt-10 pb-5 text-5xl">REBØRN</p>

          <UTabs 
          :ui="{ list: { tab: { active: 'bg-blue-500' } } }" 
          :items="items" 
          :orientation="windowWidth > 768 ? 'horizontal' : 'vertical'"
          class="container mx-auto text-center h-full place-content-center pt-5 w-10/12" >
      
                <template #home="{ item }" >

                    <div 
                    class="container mx-auto flex flex-col items-center" 
                    :style="{
                    height: windowWidth < 768 ? 'auto' : '70vh', 
                    display: 'flex', 
                    'align-items': 'center', 
                    'justify-content': 'center',
                    border: '1px solid red',
                    margin: windowWidth < 768 ? '5rem auto' : '',
                    }">
                      
                    

                    <h1 
                    class="mt-10" 
                    :style="{
                    'font-size': windowWidth < 400 ? '2rem' : (windowWidth < 1200 ? '3rem' : '5rem'), 
                    'font-family': 'Raleway, sans-serif', 
                    'font-weight': 'bold',
                    }">
                    Waiting lists for private daycares in Copenhagen
                    </h1>

                    <p 
                    class="mt-5 text-lg" 
                    :style="{
                    'font-family': 'Raleway, sans-serif', 
                    'font-size': windowWidth < 400 ? '1rem' : '',
                    }">
                      Sign up your children in an easy and transparent way.
                    </p>

                          <form class="row flex-center flex mt-10 text-center" @submit.prevent="handleLogin" style="font-family: 'Raleway', sans-serif;">
                                    <div class="col-6 form-widget">
                                      <div>
                                        <input class="inputField border border-black-500 p-1" required type="email" placeholder="Your email" v-model="email" style="width: 11rem;" />

                                      </div>

                                  
                                      <div>
                                        <input
                                          type="submit"
                                          class="button block cursery text-center dark:bg-white-500 dark:text-white"
                                          :value="loading ? 'Loading' : 'Sign up'"
                                          :disabled="loading"
                                          style="
                                          background-color: #7DCC7F;
                                          color: #35354A;
                                          border: 1px solid white; 
                                          padding: 0.5rem 1rem; 
                                          margin: 1rem auto;
                                          width: 11rem;
                                          font-size: 1.2rem;
                                          transition: background-color 0.3s ease;"
                                          onmouseover="this.style.backgroundColor='#F8F6F6'" 
                                          onmouseout="this.style.backgroundColor='#7DCC7F'"
                                          
                                        />
                                      </div>
                                    </div>
                            </form>


                    </div>  

                </template>

                <template #problematic="{ item }">

                  <div 
                  class="container mx-auto flex flex-row overviewDiv" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div>

                      <h2 style="font-size: 3rem; max-width: 40vw; text-align: left; font-family: 'Raleway', sans-serif; font-weight: bold;">Daycare overview in Copenhagen</h2>

                      <div class="text-left mt-5" style="max-width: 60ch">

                        <p class="mb-2 overviewP" style="font-family: 'Raleway', sans-serif;">
                        Signing up to daycares is a project in itself.
                      </p>

                      <p class="mb-2 overviewP" style="font-family: 'Raleway', sans-serif;">
                        Each institution has its own rules, opening hours and waiting list systems.
                      </p>

                      <p class="overviewP overviewLastP" style="font-family: 'Raleway', sans-serif;">
                        Rebørn by Waitly is a centralized platform, where one can find every private daycare
                        in Copenhagen and sign up to waiting lists without opening dozens of tabs.
                      </p>
                        
                        
                      </div>
                      
                      
                      
                    </div>


                        <BarChart />

                  </div>


                </template>

                <template #institutions="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-row items-center" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div>

                      <h2 style="font-size: 3rem; max-width: 40vw; text-align: left; font-family: 'Raleway', sans-serif; font-weight: bold;" class="mr-5">Types of institutions</h2>

                      <p class="text-left mt-5" style="max-width: 60ch; font-family: 'Raleway', sans-serif;">
                        Many institutions have their own methodologies. 
                        Other follow specific beliefs. 

                        Click on each tab to see more information. 
                      </p>
                      
                    
                    </div>


                    <UTabs :items="institutions"  orientation="vertical" class="container mx-auto w-2/5 px-3 mx-3">

                      <template #montessori="{ item }">
                        
                          <p class="text-left pt-3" style="font-family: 'Merriweather';">
                            Montessori is a method of education that is based on self-directed activity, 
                            hands-on learning and collaborative play. In Montessori classrooms children make 
                            creative choices in their learning, while the classroom and the highly trained teacher 
                            offer age-appropriate activities to guide the process.
                          </p>
                        
                      </template>

                      <template #steiner="{ item }">
                        
                        <p class="text-left pt-3" style="font-family: 'Merriweather';">
                          Steiner teachers aim to create an environment that facilitates children´s 
                          self-directed free play. In Steiner philosophy, free play supports the proper development 
                          of the will, and children are trusted to work out identities, relationships, 
                          fantasy and reality for themselves through play.
                        </p>
                      
                    </template>

                    <template #international="{ item }">
                        
                        <p class="text-left pt-3" style="font-family: 'Merriweather';">
                          Focuses on the 4 domains of learning: Social and Emotional Development, Language Development, 
                          Cognitive Development and Physical Development. learning and growth in these areas are encouraged 
                          by offering developmentally appropriate learning experiences.  
                        </p>
                      
                    </template>
                    
                    </UTabs>

                    </div>


                </template>

                <template #about="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-row items-center aboutUsDiv" style="height: 70vh; display: flex; align-items: center; justify-content: center;">

                    <div class="mr-10">
                    

                      <h2 class="mr-5 aboutUsTitle" style="font-size: 3rem; max-width: 40vw; text-align: left; font-family: 'Raleway', sans-serif; font-weight: bold;">About us</h2>

                      <p class="text-left mt-5 mb-3 aboutUsP" style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                        Rebørn is an initiative by Waitly.dk. 
                      </p>

                      <p class="text-left mt-5 mb-3 aboutUsP" style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                        It's name comes from <strong>reimagining</strong> how parents 
                        can access waiting lists combined with <strong><em>børn</em></strong>, 
                        the word for <strong><em>children</em></strong> in Danish.
                        
                      </p>
                        
                      <p class="text-left mt-5 mb-3 aboutUsP" style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                        Its aim is to make the daycare category more accessible and transparent.
                      </p>

                      <p class="text-left mt-5 mb-3 aboutUsP" style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                        Click on each tab to see frequently asked questions. 
                      </p>

                    </div>

                      <UAccordion :ui="{item: { color: 'text-white, dark:text-white'}, default: { variant: 'ghost'}}" size="sm" :items="faq"  orientation="vertical" class="container mx-auto w-2/5 px-3 mx-3 text-left aboutUsAccordion">
                        
                      
                      </UAccordion>

                   
                  </div>


                </template>

                <template #contact="{ item }" class="text-center">

                  <div class="container mx-auto flex flex-col items-center contactDiv" style="height: 70vh; display: flex; flex-direction: row; align-items: center; justify-content: space-around;">

                    <div>

                          <h2 style="font-size: 3rem; max-width: 40vw; text-align: left; font-family: 'Raleway', sans-serif; font-weight: bold;" class="mr-5 contactTitle">Contact</h2>

                          <p class="text-left mt-5 mb-3 contactP" style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                            reborn-waitinglists@gmail.com
                          </p>

                          <p class="text-left mt-5 mb-3 contactP" style="max-width: 50ch; font-family: 'Raleway', sans-serif;">
                            Or give us a call Monday to Friday from 9 to 13.
                          </p>

                  </div>

                  <div class="contactImgDiv" style="max-width: 50%;">
                  <img style="max-width: 100%; height: auto;" src="../assets/dreng.jpg" alt="">  
                  </div>


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

  @media only screen and (min-width: 1301px){

  






/* contact */

.contactDiv{
  flex-direction: row !important;
}

.contactImgDiv{
  max-width: 50% !important;
}


}

  @media only screen and (max-width: 1300px) and (min-width: 769px){



    /* overview */
    .overviewDiv{
      flex-direction: column !important;
    }
    
    h2{
      text-align: center !important;
      max-width: 100% !important;
      font-size: 2.5rem !important;
    }

    .overviewP{
      max-width: 100% !important;
      margin: 0rem auto !important;
    }

    .overviewLastP{
      margin-bottom: 2rem !important;
    }

    /* about us */

    .aboutUsDiv{
      flex-direction: column !important;
      margin-top: 5rem !important;
    }

    .aboutUsTitle{
      max-width: 100% !important;
    }

    .aboutUsP{
      max-width: 100% !important;
    }

    .aboutUsAccordion{
      width: 70% !important;
      margin-top: 5rem !important;
      text-align: center !important;
    }

    /* contact */

    .contactDiv{
      flex-direction: column !important;
    }

    .contactTitle{
      max-width: 100%;
    }

    .contactP{
      max-width: 100%;
    }

    .contactImgDiv{
      max-width: 80% !important;
    }


  }

  @media only screen and (max-width: 768px){

  
 

    /* overview */


    .overviewDiv{
      flex-direction: column !important;
    }
    
    h2{
      text-align: center !important;
      max-width: 100% !important;
      font-size: 2rem !important;
    }

    .overviewP{
      max-width: 100% !important;
      margin: 0rem auto !important;
      font-size: 1rem !important;
    }

    .overviewLastP{
      margin-bottom: 2rem !important;
    }

    /* about us */

    .aboutUsDiv{
      flex-direction: column !important;
      margin-top: 3rem !important;

    }

    .aboutUsTitle{
      max-width: 100% !important;
    }

    .aboutUsP{
      max-width: 100% !important;
    }

    .aboutUsAccordion{
      width: 100% !important;
      margin-top: 5rem !important;
      text-align: left !important;
    }

     /* contact */

     .contactDiv{
      flex-direction: column !important;
    }

    .contactTitle{
      max-width: 100%;
    }

    .contactP{
      max-width: 100%;
    }

    .contactImgDiv{
      max-width: 100% !important;
    }

  }


  @media only screen and (max-width: 500px){
   

  

    /* overview */


    .overviewDiv{
      flex-direction: column !important;
      height: 90vh !important;
    }
    
    h2{
      text-align: center !important;
      max-width: 100% !important;
    }

    .overviewP{
      max-width: 100% !important;
      margin: 0rem auto !important;
    }

    .overviewLastP{
      margin-bottom: 2rem !important;
    }

    /* about us */

    .aboutUsDiv{
      flex-direction: column !important;
      margin-top: 7rem !important;
      margin-bottom: 10rem !important;

    }

    .aboutUsTitle{
      max-width: 100% !important;
    }

    .aboutUsP{
      max-width: 100% !important;
    }

    .aboutUsAccordion{
      width: 100% !important;
      margin-top: 3rem !important;
      text-align: left !important;
    }

     /* contact */

     .contactDiv{
      flex-direction: column !important;
    }

    .contactTitle{
      max-width: 100%;
    }

    .contactP{
      max-width: 100%;
    }

    .contactImgDiv{
      max-width: 100% !important;
    }

  }


</style>