<template>
<!-- Property - Desktop -->
  <div class="bg-[#0e0e0e] rounded-lg p-4 flex flex-col gap-4">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-lg font-bold">{{ data.var }}</h2>
        <p class="text-sm text-gray-400">View : {{ data.view }}</p>
      </div>
      <div class="text-sm text-gray-400">Unit: {{ data.unit }}</div>
    </div>
    <div class="swiper-container outer-swiper relative mb-10 h-[16rem]">
      <swiper
        :modules="[Pagination]"
        :pagination="{ clickable: true }"
        :slides-per-view="1.2"
        :space-between="10"
        class="rounded-lg"
      >
        <!-- Video as first slide -->
        <swiper-slide>
          <div 
            class="relative rounded-2xl h-[16rem] overflow-hidden"
            @click="toggleVideo('desktopVideo1')"
          >
            <video 
              ref="desktopVideo1"
              class="w-full h-full object-cover"
              muted
              loop
              playsinline
            >
              <source src="/assets/videos/unit-video.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div 
              class="absolute inset-0 flex items-center justify-center"
              v-if="!videoStates.desktopVideo1"
            >
              <button class="p-2 bg-opacity-50 rounded-full">
                <img
                  src="assets/images/video-play.svg"
                  alt="video play"
                  class="w-[40px] sm:w-[60px]"
                />
              </button>
            </div>
          </div>
        </swiper-slide>
        
        <!-- Image slides -->
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="h-[16rem]">
            <img
              :src="slide"
              alt="Property Image" 
              class="w-full h-full object-cover rounded-2xl"
            /> 
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="flex justify-between">
      <span>Size: {{ data.size }}</span>
      <span>{{ data.floor }}</span>
    </div>

    <div class="flex justify-between items-center py-2.5 border-t border-b border-gray-700">
      <div>Price</div>
      <div class="font-bold">{{ data.price }}</div>
    </div>

    <div class="flex flex-col gap-2.5">
      <h3 class="text-base">Features:</h3>
      <ul class="flex flex-col gap-2 px-4">
        <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0" v-for="feature in data.features">{{ feature }}</li>
      </ul>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex border-t py-2.5 border-b border-gray-700 justify-between">
        <span>Bedrooms</span>
        <span>{{ data.bedrooms }}</span>
      </div>
      <div class="flex border-b py-2.5 border-gray-700 justify-between">
        <span>Bathrooms</span>
        <span>{{ data.bathrooms }}</span>
      </div>
    </div>

    <div class="flex mt-auto gap-6 py-2.5">
      <div class="flex gap-1 text-gray-100">
        <img src="/assets/images/3dex.svg" alt="3d icon"/> <span class="text-gray-200">3D Experience</span> 
      </div>
      <div class="flex gap-1"> <img src="/assets/images/cal.svg" alt="3d icon"/> <span class="text-gray-200">Book A Visit</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import { ref } from 'vue';

const props = defineProps<{
  videoStates: object;
  slides: Array<Record<string, any>>;
  data: object;
}>();

const desktopVideo1 = ref(props.videoStates.desktopVideo1);
const videoStates = ref(props.videoStates);

const emit = defineEmits<{
  (e: 'toggle', videoRefName: string): void;
}>();

// const toggleVideo = (videoRefName) => {
//   emit('toggle', videoRefName); // Emit event with argument
// };

const toggleVideo = (videoRefName) => {
  const videoRef = {
    desktopVideo1,
  }[videoRefName];
  
  if (videoRef.value) {
    if (videoRef.value.paused) {
      videoRef.value.play();
      videoStates.value[videoRefName] = true;
    } else {
      videoRef.value.pause();
      videoStates.value[videoRefName] = false;
    }
  }
};

</script>

<style scoped>

  /* Mobile specific styles */

</style>