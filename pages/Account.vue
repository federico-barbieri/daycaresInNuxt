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

const daycareTabs = [{
  label: 'Filters',
  slot: 'filters'
}, {
  label: 'Map',
  slot: 'map'
}, {
  label: 'Distance',
  slot: 'distance'
}]

const daycares = ref([])

async function getDaycares(){

if(selectedAreaForFiltering.value == '' || selectedAreaForFiltering.value == 'All'){

let { data: fetchedDaycares, error } = await supabase
  .from('daycares')
  .select('*')
  
  daycares.value = fetchedDaycares

} else{

  let { data: fetchedDaycares, error } = await supabase
  .from('daycares')
  .select('*')
  .eq('area', selectedAreaForFiltering.value)

  
  daycares.value = fetchedDaycares

}

}


// daycare modal

let daycareModalisOpen = ref(false)
let daycareId = ref()
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

          daycareId.value = data[0].unique_id;
          
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

// this stores the message the parent sends to the daycare

let messageToDaycare = ref('');

// this stores the kid the parent chooses to apply to a daycare

let selectedKidForSubscription = ref();


async function applyToDaycare(){

  try {

  // this will store the selected child's id to send as part of the subscription

    let childObject = children.value.filter((kid) => kid.name == selectedKidForSubscription.value);

    let childId = childObject[0].id;
    let childName = childObject[0].name;
  
 
      loading.value = true
      const { user } = session.value

      const addNewSubscription = {

        parent_id: user.id,
        child_id: childId,
        child_name: childName,
        daycare_id: daycareId.value,
        daycare_name: daycareName.value,
        message: messageToDaycare.value,
      }

      const { error } = await supabase.from('subscriptions').upsert(addNewSubscription)

      if (error) throw error
      toast.add({ title: 'Application sent succesfully!' })
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
      messageToDaycare.value = "";
      selectedKidForSubscription.value = ""; 
      subscriptions.value = '';
      getSubscriptions();

    }
}

// DAYCARE filters

let areaOptions = ['All', 'Amager', 'Vesterbro, Kgs. Enghave og Valby', 'Nørrebro', 'Brønshøj, Husum og Vanløse', 'Inner City', 'Østerbro', 'Bispebjerg'];

let selectedAreaForFiltering = ref('');

// filter through daycares based on listening to changes in selectedAreaForFiltering ref

watch(selectedAreaForFiltering, () => {

  getDaycares();
  

});

// map

const mapIsOpen = ref(true)





// CHILDREN ////////////////////

// this stores the data coming from the database

let children = ref()

// this tells me if there are any kids

let childrenExist = ref(false);

// this is where i store only the names of the children

let childrenNames = ref()

// this is how i transform childrenNames into an array of objects
// to be used in the "select" element inside of the daycare slider

const childrenOptions = ref()




async function getChildren(){

  children.value = '';

    const { user } = session.value


    const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id);



        if (data && data.length > 0) {
          childrenExist.value = true;

          // store the children array          
          children.value = data;

          // store the children names
          childrenNames.value = children.value.map(child => child.name);

          // turn the children names' variable into an array of objects
          childrenOptions.value = childrenNames.value.map(name => ({ label: name, value: name }));

      } else{
        childrenExist.value = false;
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


// SUBSCRIPTIONS ////////////////////

// this stores the data coming from the database

let subscriptions = ref()

// this tells me if there are any kids

let subscriptionsExist = ref(false);

async function getSubscriptions(){

  const { user } = session.value


    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('parent_id', user.id);



        if (data && data.length > 0) {
          subscriptionsExist.value = true;

          // store the subscriptions array          
          subscriptions.value = data;
          subscriptions.value = subscriptions.value.reverse();

      } else{
        subscriptionsExist.value = false;
        console.log("no subscriptions found")
      }

      if (error) {
        console.error('Error fetching subscriptions:', error.message);
        return;
      }

}






/// INITIALIZE


onMounted(() => {
  getProfile();
  getDaycares();
  getChildren();
  getSubscriptions();



})

// tabs from nuxt ui

const items = [{
  
  slot: 'children',
  label: 'My children'
},
{
  slot: 'daycares',
  label: 'Daycares'
},
{
  slot: 'subscriptions',
  label: 'Subscriptions'
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

<div v-else style="width: 80vw;  height: 80vh; overflow: hidden;">
  <h1 class="font-sans">Hej {{fetchedFullName}}!</h1>

  <UTabs :items="items"  orientation="horizontal" style="width: 100%; height: 100%;">


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

        <ul v-if="children" style="width: 50%;  height: 600px; overflow-y: auto;">
   
                <UCard :ui="{background:'dark:bg-transparent'}" v-for="child in children" :key="child.id" class="newCard">
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


<!--DAYCARES-->

    <template #daycares="{ item }">

      <div name="daycareContainer" style="width: 100%; height: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
        
        
      

      <UTabs :ui="{list:{width: 'w-36'}}" :items="daycareTabs" orientation="vertical" style="width: 100%; height: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
        
        <template #filters = {item}>
          

                  <!--FILTERS-->

                  

                        <div v-if="daycares.length > 0" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">


                              <!--FILTER BY AREA-->

                              <USelect
                              style="width: 100%;"
                              placeholder="Filter by area"
                              :options="areaOptions"
                              v-model="selectedAreaForFiltering"
                              icon="i-heroicons-magnifying-glass-20-solid"
                              />       
                        
                        


            
            
            
                          <div style="width: 60%">

                                  <ul v-if="daycares.length > 0" class="daycare-ul w-full" style="width: 100%">
                          
                                            <UCard :ui="{background: 'dark:bg-transparent'}" as="div" v-for="daycare in daycares" :key="daycare.id" class="newCardDaycare" style="width: 90%;">
                                                <template #header>
                                                  <h2><strong>{{ daycare.name }}</strong></h2>
                                                </template>

                                                <div>
                                                  <p><em>{{ daycare.address }}</em></p>
                                                  <span>{{ daycare.area }}</span>
                                                </div>


                                                <template #footer>
                                                  <button @click="activateModal(daycare)"  class="moreInfoBtn">More Info</button>
                                                </template>
                                            </UCard>
                                    </ul> 
                            
                            </div>

                        </div>

                        <USlideover  v-model="daycareModalisOpen" >
                            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', background: 'dark:bg-transparent'}">
                  

                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%">

                                        <div style="width: 100%;">
                                          <img src="../assets/pige.jpg" alt="" style="max-width: 100%; height: auto; border-radius: 30px;">
                                          
                                        </div>
                                  
                                        

                                        <div style="display: flex; flex-direction: column; align-items: left; justify-content: space-around; width: 100%">
                                          
                                              <h3 style="font-size: 2rem; text-align: center;">{{ daycareName }}</h3>
                                              <span style="font-size: 1rem;">Area: {{ daycareArea }}</span>
                                              <span style="font-size: 1rem;">Opening hours: {{ daycareOpeningHours }}</span>
                                              <span style="font-size: 1rem;">Organic meals: {{ daycareOrganicMeals ? 'Yes' : 'No' }}</span>
                                            <span style="font-size: 1rem;">Website: <nuxtLink :to=daycareWebsite target="_blank"> {{ daycareWebsite }}</nuxtLink></span>
                                          
                                        </div>
                                  

                                  </div>

                                    <div style="display: flex; flex-direction: column; align-items: left; justify-content: space-around; width: 50%">
                                          
                                          <span>Waiting list cost per yer: {{ daycareCost }}DKK</span>
                                          <span>{{ daycareEmail }}</span>
                                          <span>{{ daycareNumber }}</span>
                                      
                                    </div>
                                    <h3>Apply to this daycare</h3>

                                    <USelect
                                    placeholder="Select child"
                                    :options="childrenOptions"
                                    v-model="selectedKidForSubscription"
                                    />

                                    

                                    <UTextarea class="mt-5" :rows="8" size="xl" color="gray" v-model="messageToDaycare" placeholder="(OPTIONAL) Send a message to the daycare.." />

                                    <UButton @click="applyToDaycare">SUBSCRIBE</UButton>
                  
                                
                            
                              </UCard>
            
                      </USlideover>
          
          
          </template>

          <template #map = {item}>

          <!--SEE MAP-->

          <div style="width: 100%; height: 60vh; display: flex; flex-direction: row; align-items: center; justify-content: center;">


            
              <MapboxMap
                        v-if="mapIsOpen"
                        map-id="map"
                        style="width: 90%; height: 100%"
                        :options="{
                          style: 'mapbox://styles/mapbox/light-v11', // style URL
                          center: [12.545607, 55.671999], // starting position
                          zoom: 11 // starting zoom
                        }"
                        >

                        

                        <MapboxDefaultMarker 
                                            marker-id="<MARKER_ID>"
                                            :options="{}"
                                            :lnglat="[ 12.503210197810002, 55.65959084761282]"
                                            >

                                                <MapboxDefaultPopup
                                                
                                                popup-id=""
                                                :lnglat="[12.503210197810002, 55.65959084761282]"
                                                :options="{
                                                    closeOnClick: false
                                                }"
                                                >
                                                        <span class="test" style="color: black;">
                                                            Den integrerede institution Nordstjernen
                                                        </span>
                                                </MapboxDefaultPopup>
                                    
                                        </MapboxDefaultMarker>

                       
                        
                        
                      </MapboxMap>
                
          
          </div>
          
          </template>

          <template #distance = {item}>


            </template>
        
        
        
        

      



      
    
          </UTabs>
      </div>
    
    </template>

    

<!--SUBSCRIPTIONS-->


<template #subscriptions="{ item }">

  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; width: 100%; height: 100%; margin: 0 auto">


    <div style="width: 80%;">
        <p v-if="!subscriptionsExist">You haven't applied to any daycare yet.</p>

        <ul v-if="subscriptions.length > 0" class="daycare-ul" style="width: 100%; text-align: center;">

          <UCard v-for="subscription in subscriptions" :key="subscription.id" class="newCard">
              <template #header>
                <h2><strong>Application for: {{ subscription.daycare_name }}</strong></h2>
              </template>

              <div style="color: black;">
                <p class="address"><em>Subscription of: {{ subscription.child_name }}</em></p>
                <span class="area">Message sent to daycare: {{ subscription.message }}</span>
                <span style="display: block;">Date of application: {{ new Date(subscription.created_at).toLocaleDateString('en-GB') }}</span>
              </div>

          </UCard>
        </ul> 

    </div>


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
    width: 100%;
    height: auto;
    list-style: none;
    height: 550px; /* Set a fixed height or adjust as needed */
    overflow-y: auto; /* Enable vertical scrolling */
    padding: 1rem;
}

.newCard{
  margin: 1.5rem auto;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  width: 80%;
}

.newCardDaycare{
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