<template>
    <div style="border:1px solid red; width: 50%; height: 50vh;">

        <input v-model="lat1" />
        <input v-model="long1" />

        <input v-model="lat2" />
        <input v-model="long2" />

        <button @click="getDistance"></button>


       

    </div>
</template>

<script setup>

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

// Usage
const distance = getDistance(latitude1, longitude1, latitude2, longitude2);
console.log(`The distance between the points is approximately ${distance.toFixed(2)} kilometers.`);

let latitude1 = ref();
let longitude1 = ref();

let longitude2 = ref();
let latitude2 = ref();




</script>

<style scoped>

</style>