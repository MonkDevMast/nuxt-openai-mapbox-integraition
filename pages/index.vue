<script setup lang="ts">
import { useRouter } from "vue-router";
import MainSection from '~/components/VoiceInput.vue';
definePageMeta({
  layout: false,
});
const router = useRouter();
useHead({
  title: "Rechitta",
  meta: [
    {
      name: "description",
      content:
        "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});

const isActive = ref(true);
const isTransitioning = ref(false);

const toggleMic = () => {
  isActive.value = !isActive.value;
  isTransitioning.value = true;
  setTimeout(() => {
    goToProperties();
  }, 500);
};

const micText = ref("Rachitta is Listening....");

function goToProperties() {
  router.push("/property-list");
}
</script>

<template>
  <div class="relative h-full w-[100vw] overflow-hidden text-white">
    <!-- Background Video -->
    <video
    autoplay
    muted
    loop
    playsinline
    class="absolute top-0 left-0 w-full h-full object-cover transform scale-100"
>
    <source src="/public/videos/background.webm" type="video/mp4" />
    Your browser does not support the video tag.
</video>

<img src="../assets/images/layout-bg.png" class="absolute top-0 left-0 w-full h-full object-cover"/>

    <!-- Overlay Content -->
    <div class="relative z-10 flex flex-col h-full w-full bg-0">
      <!-- Top Logos -->
      <div class="flex justify-between items-center pt-6 px-9 h-[12vh]">
        <img
          src="/assets/images/richitta-logo.svg"
          alt="Rechitta Logo cursor-pointer"
          class="h-3 lg:h-5 cursor-pointer"
          @click="$router.push('/')"
        />
        <img
          src="/assets/images/anax-logo.svg"
          alt="Anax Logo cursor-pointer"
          class="h-[30px] lg:h-[60px] cursor-pointer"
        />
      </div>


      <!-- Main Section -->
    
    <div class="lg:h-[75vh] sm:h-[78vh] h-[88vh] py-3 px-3 flex flex-col justify-end items-center text-center">
       <div class="transition-all duration-500" :class="{ 'translate-y-10 opacity-0': isTransitioning }">
         <MainSection 
          :is-transitioning="isTransitioning"
          :mic-text="micText"
          :multi="false"
          :is-active="isActive"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"

          @toggle="toggleMic"
        />
       </div>

    </div>
     
      <!-- Footer Section -->
      <div
        class="w-full justify-between items-center px-14 item-center pb-4 pt-5 h-[13vh] text-white hidden md:flex"
      >
        <p
          class="text-white text-xl font-light uppercase tracking-[0.72px] transition-all duration-1000"
          :class="{ 'translate-y-10 opacity-0': isTransitioning }"
          style="font-family: 'PP Neue Machina Light', sans-serif"
        >
          DUBAI
        </p>
        <p
          class="text-white text-xl font-light uppercase tracking-[0.72px] transition-all duration-1000"
          :class="{ 'translate-y-10 opacity-0': isTransitioning }"
          style="font-family: 'PP Neue Machina Light', sans-serif"
        >
          REAL ESTATE - REIMAGINED
        </p>
      </div>
    </div>
  </div>
</template>
