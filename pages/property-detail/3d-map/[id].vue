<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import mapboxgl from "mapbox-gl";
import { useRoute } from "vue-router";

const route = useRoute();
const unitId = route.params.id;
const isLoading = ref(true);

mapboxgl.accessToken = "pk.eyJ1IjoicG9naXBpZzk3NiIsImEiOiJjbTl2am5uYzUwbjAwMnNzYmFhMTF6cXU4In0.lNFW3RficBZJB9g5OXJhDg";

const mapContainer = ref<HTMLElement | null>(null);

useHead({
  title: "Rechitta - Property 3D Map",
  meta: [
    {
      name: "description",
      content: "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    nextTick(() => {
      if (mapContainer.value) {
        const map = new mapboxgl.Map({
          container: mapContainer.value,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [55.2708, 25.2048],
          zoom: 15,
          pitch: 60,
          bearing: -17.6,
          antialias: true,
        });

        map.on("load", () => {
          map.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.6,
            },
          });
        });
      }
    });
  }, 300);
});
</script>

<template>
  <div class="h-full w-full px-2">
    <div class="w-full h-full flex justify-center items-center">
      <div v-if="isLoading" key="loading" class="loading-spinner-container">
          <!-- <div class="loading-spinner"></div> -->
        </div>
      <transition v-else name="fade" mode="out-in">
      
        
        <div
          
          key="content"
          
          class="flex flex-col bg-black z-[9999] backdrop-blur-xl shadow-lg rounded-3xl px-5 py-5 max-w-[1200px] w-full min-h-[300px] h-[40%] sm:h-[75%] overflow-hidden map-box "
        >
          
          <div class="w-full h-full">
            <div ref="mapContainer" class="h-full w-full rounded-2xl" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@import "mapbox-gl/dist/mapbox-gl.css";

.map-box {
  
  box-shadow: 0px 0px 150px 0px rgba(167, 167, 167, 0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #33c3f0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>