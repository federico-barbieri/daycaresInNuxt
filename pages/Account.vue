<script setup>


import { supabase } from '../lib/supabase.js'
import { onMounted, ref, toRefs } from 'vue'


const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)


// NOTIFICATIONS 

const toast = useToast()

// USER ////////////////////
const name = ref('')

let fetchedFullName = ref('')


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

      fetchedFullName = name.value;

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

// DAYCARES ////////////////////

const daycares = ref([])

async function getDaycares(){

let { data: fetchedDaycares, error } = await supabase
  .from('daycares')
  .select('*')

  daycares.value = fetchedDaycares
}


// daycare modal

let daycareModalisOpen = ref(false)
let daycareName= ref('');
let daycareAddress = ref('');
let daycareArea = ref('');
let daycareOpeningHours = ref('');
let daycareOrganicMeals = ref(null);
let daycareWebsite = ref('');
let daycareCost = ref(null);
let daycareEmail = ref('');
let daycareNumber = ref(null);

async function activateModal(selectedDaycare){

  try {
        loading.value = true

        const { data, error, status } = await supabase
          .from('daycares')
          .select('*')
          .eq('id', selectedDaycare.id)

        if (error && status !== 406) throw error

        if (data && data.length > 0) {
          console.log(data[0]);
          daycareName.value = data[0].name;
          daycareAddress.value = data[0].address;
          daycareArea.value = data[0].area;
          daycareOpeningHours.value = data[0].opening_hours;
          daycareOrganicMeals.value = data[0].organic_meals;
          daycareWebsite.value = data[0].website;
          daycareCost.value = data[0].cost;
          daycareEmail.value = data[0].email;
          daycareNumber.value = data[0].phone;

          daycareModalisOpen.value = true;
        }

        
      } catch (error) {
        alert(error.message)
      } finally {
        loading.value = false
      }




}




// CHILDREN ////////////////////

let children = ref()

let childrenExist = ref(false);


async function getChildren(){

    const { user } = session.value


    const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id);



        if (data && data.length > 0) {
          childrenExist.value = true;
          
          children.value = data;
          console.log(children.value);
      } else{
        console.log("no children found")
      }

      if (error) {
        console.error('Error fetching children:', error.message);
        return;
      }
}


// add child profile

let kidName = ref('');
let kidCpr = ref('')

async function addKid(){

  try {
      loading.value = true
      const { user } = session.value

      const addNewKid = {

        parent_id: user.id,
        name: kidName.value,
        cpr: kidCpr.value,
      }

      const { error } = await supabase.from('children').upsert(addNewKid)

      if (error) throw error
      toast.add({ title: 'Profile added succesfully!' })
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
      getChildren()
      kidName.value = "";
      kidCpr.value = "";
    }

}


async function removeKid(kidId) {
    try {
        const { data, error } = await supabase
            .from('children')
            .delete()
            .eq('id', kidId);

        if (error) {
            console.error('Error removing child:', error.message);
            toast.add({ title: 'Failed to remove child profile!', variant: 'error' });
        } else {
            toast.add({ title: 'Child profile removed successfully!' });
            await getChildren(); 
        }
    } catch (err) {
        console.error('An unexpected error occurred:', err.message);
        toast.add({ title: 'Unexpected error occurred!', variant: 'error' });
    }
}




onMounted(() => {
  getProfile()
  getDaycares()
  getChildren();
})



// tabs from nuxt ui

const items = [{
  
  slot: 'children',
  label: 'My children'
},
{
  slot: 'daycares',
  label: 'Browse daycares'
},
{
  slot: 'waitinglist',
  label: 'Waiting lists'
}]



</script>

<template>
    <div class="main">

      <!--HEADER-->

      <header class="w-full">
        
      <nav class="flex flex-row align-center justify-center" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
        
        <p class="font-sans pt-10 pb-5 text-5xl">REBØRN</p>

        <p style="cursor: pointer;" @click="signOut">Log out</p>

        
        </nav>  
        
        
      </header>


<!-- IF THIS IS THE FIRST TIME THE USER LOGGED IN, THEY WILL BE ASKED TO PROVIDE A NAME-->

<div v-if="!fetchedFullName">
  <form  class="form-widget" @submit.prevent="updateProfile">
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


  </form>
  
  
  </div>
  <!-- ELSE, WE WILL ALREADY HAVE THEIR NAME-->

<div v-else style="width: 80vw;  height: 80vh">
  <h1 class="font-sans">Hej {{fetchedFullName}}!</h1>

  <UTabs :items="items"  orientation="horizontal" style="width: 100%; height: 100%;">


<!--DAYCARES-->

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
              <button @click="activateModal(daycare)"  class="moreInfoBtn">More Info</button>
            </template>
        </UCard>
      </ul> 

      <UModal v-model="daycareModalisOpen" :ui="{ height:  'h-', width: 'lg:max-w-lg' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800'}">
   

          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 100%">

                  <div style="width: 50%;">
                    <img src="../assets/pige.jpg" alt="" style="max-width: 100%; height: auto">
                    
                    </div>
            
                  

                  <div style="display: flex; flex-direction: column; align-items: left; justify-content: space-around; width: 50%">
                    
                        <h3>{{ daycareName }}</h3>
                        <span>{{ daycareArea }}</span>
                        <span>{{ daycareOpeningHours }}</span>
                        <span>Organic meals: {{ daycareOrganicMeals ? 'Yes' : 'No' }}</span>
                        <span>{{ daycareWebsite }}</span>
                    
                  </div>
            

            </div>

            <div style="display: flex; flex-direction: column; align-items: left; justify-content: space-around; width: 50%">
                    
                    <h3>{{ daycareCost }}</h3>
                    <span>{{ daycareEmail }}</span>
                    <span>{{ daycareNumber }}</span>
                
              </div>

              <UButton>SUBSCRIBE</UButton>
  
            
      

        

     
      </UCard>
    </UModal>
    
    
    </template>

    <!--CHILDREN-->



    <template #children="{ item }">

      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-around; width: 80%; height: 100%; margin: 0 auto">

        <div style="width: 40%; height: 100%;">
          

          <p v-if="!childrenExist">You haven't added any children yet.</p>
  
  
          <form action="submit" @submit.prevent="addKid" style="width: 100%; height: 80%;">
            
            <UFormGroup label="Name" class="mb-5">
                      <UInput placeholder="Your child's name" v-model="kidName" />
            </UFormGroup>
  
            <UFormGroup label="CPR" class="mb-5">
                      <UInput placeholder="Your child's CPR" v-model="kidCpr" />
            </UFormGroup>
  
            
            <button style="padding: 0.5rem; border: 1px solid white;">Add new profile</button>
            
            
            </form>
  
          </div>

        <ul v-if="children" style="width: 30%;  height: 600px; overflow-y: auto;">
   
                <UCard v-for="child in children" :key="child.id" class="newCard">
                    <template #header>
                      <h2><strong>Name: {{ child.name }}</strong></h2>
                    </template>

                    <div>
                      <p class="address"><em>CPR: {{ child.cpr }}</em></p>
                    </div>

                    <template #footer>
                      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-around; width: 100%;">
                        <button @click="$emit(removeKid(child.id))" style="border: 1px solid white; padding: 0.5rem;">REMOVE</button>
                      </div>
                     
                    </template>
                </UCard>
        </ul> 


             
        
      
      
        </div>


</template>






  </UTabs>

  </div>  
</div>
</template>

<style scoped>

.main{
    width: 90vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0rem auto;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 1rem;
}

h1{
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
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
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
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