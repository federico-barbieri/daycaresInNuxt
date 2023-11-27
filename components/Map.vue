<template>
    <div style="width: 80%">
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


                                        <MapboxDefaultMarker 
                                            marker-id="<MARKER_ID>"
                                            :options="{}"
                                            :lnglat="[ 12.487253626646192, 55.67212717841523]"
                                            >

                                                <MapboxDefaultPopup
                                                
                                                popup-id=""
                                                :lnglat="[12.487253626646192, 55.67212717841523]"
                                                :options="{
                                                    closeOnClick: false
                                                }"
                                                >
                                                        <span class="test" style="color: black;">
                                                            Aalholm Børnehave

                                                        </span>
                                                </MapboxDefaultPopup>
                                    
                                        </MapboxDefaultMarker>
                        
                        
            

                      

                       
                        
                        
                      </MapboxMap>
                    </div>
    
</template>

<script setup>

const mapIsOpen = ref(true)



</script>

<style scoped>


.test{
  width: 100px;
  font-size: 1rem;
  color: black;

}


</style>