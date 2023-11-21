<script setup>

// main navigation array

const items = [
  {
  label: 'Home',
  slot: 'home'
  }, 
  {
  label: 'Daycare problematic',
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
  <div class="w-screen h-screen  m-0 p-0">
  
    <header class=" mx-auto  w-screen h-full m-0 p-0">
        <nav class="mx-auto  w-screen h-full p-0">

          <UTabs :items="items"  orientation="horizontal" class="container mx-auto text-center h-full place-content-center pt-5">
      
                <template #home="{ item }" >

                    <div class="container mx-auto flex flex-col items-center" style="height: 90vh; display: flex; align-items: center; justify-content: center; ">
                      
                    

                          <h1>Waiting lists for private daycares in Copenhagen</h1>

                          <p class="mt-3 text-lg">
                            Sign your children up in an easy and transparent way.
                          </p>

                          <ul class="flex flex-row justify-evenly w-full mt-10 mb-10">
                            <li class="rounded-tr-lg rounded-bl-lg border-2 border-white-500 px-7 py-5" style="border-top-left-radius: 0; border-bottom-left-radius: 500px; border-top-right-radius: 500px; border-bottom-right-radius: 0px; min-width: 9rem;">Montessori</li>
                            <li class="rounded-tr-lg rounded-bl-lg border-2 border-white-500 px-7 py-5" style="border-top-left-radius: 0; border-bottom-left-radius: 500px; border-top-right-radius: 500px; border-bottom-right-radius: 0px; min-width: 9rem;">R. Steiner</li>
                            <li class="rounded-tr-lg rounded-bl-lg border-2 border-white-500 px-7 py-5" style="border-top-left-radius: 0; border-bottom-left-radius: 500px; border-top-right-radius: 500px; border-bottom-right-radius: 0px; min-width: 9rem;">International</li>  
                          </ul>

                          <button class="bg-green-500 px-5 py-3 rounded-none mt-5 text-black">Get started</button>

                    </div>  

                </template>

                <template #problematic="{ item }" class="text-center">

                    <h2>DAYCARE SITUATION IN COPENHAGEN</h2>

                    <p>
                      Many want to sign their children into private daycares. The problem is there is not enough place for everyone.
                    </p>
                    
                    <p>
                      Many private institutions even recommend signing children 
                      to multiple facilities to increase their odds.
                    </p>

                    <p>
                      To make things worse, signing children is a manual task and not very intuitive.
                    </p>

                    <p>
                      Rebørn by Waitly makes it easy.
                    </p>


                </template>

                <template #institutions="{ item }" class="text-center">

                    <h2>TYPES OF INSTITUTIONS</h2>

                    <p>
                      Many institutions have their own methodologies. 
                      Other follow specific beliefs. 

                      Click on each tab to see more information. 
                    </p>

                    <UTabs :items="institutions"  orientation="horizontal" class="container mx-auto">

                      <template #montessori="{ item }">
                        
                          <p>
                            Montessori is a method of education that is based on self-directed activity, 
                            hands-on learning and collaborative play. In Montessori classrooms children make 
                            creative choices in their learning, while the classroom and the highly trained teacher 
                            offer age-appropriate activities to guide the process.
                          </p>
                        
                      </template>

                      <template #steiner="{ item }">
                        
                        <p>
                          Steiner teachers aim to create an environment that facilitates children´s 
                          self-directed free play. In Steiner philosophy, free play supports the proper development 
                          of the will, and children are trusted to work out identities, relationships, 
                          fantasy and reality for themselves through play.
                        </p>
                      
                    </template>

                    <template #international="{ item }">
                        
                        <p>
                          Focuses on the 4 domains of learning: Social and Emotional Development, Language Development, 
                          Cognitive Development and Physical Development. learning and growth in these areas are encouraged 
                          by offering developmentally appropriate learning experiences.  
                          Children use a variety of materials including blocks, dramatic play props, paint, 
                          puzzles and manipulatives, books and large motor equipment. 
                          These experiences are also fostered by planned activities such as group play times, 
                          outdoor activities, music, games and art.
                        </p>
                      
                    </template>
                    
                    </UTabs>


                </template>

                <template #about="{ item }" class="text-center">

                      <h2>ABOUT US</h2>

                      <p>
                        Rebørn is an initiative by WAITLY. Its aim is to make the daycare category more transparent.
                        Click on each tab to see frequently asked questions. 
                      </p>

                      <UAccordion :items="faq"  orientation="vertical" class="container">
                        
                        
                        
                        
                      </UAccordion>

                   


                </template>

                <template #contact="{ item }" class="text-center">

                    <h2>CONTACT</h2>

                    <p>
                      reborn-waitinglists@gmail.com

                      Or give us a call Monday to Friday from 9 to 13.
                    </p>

                </template>




          </UTabs>
          
          
          
        </nav>

      

      </header>
  
  
  </div>
</template>

<style scoped>

h1{
  font-size: 5rem;
}

</style>