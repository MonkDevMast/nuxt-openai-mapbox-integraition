<script setup lang="ts">
import { useRouter } from "vue-router";
import MainSection from '~/components/VoiceInput.vue';
import { usePageLayoutStore } from '~/stores/pagelayoutStore';
const store = usePageLayoutStore();

// definePageMeta({
//   layout: false,
// });
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
  
};

const micText = ref("Rachitta is Listening....");

function goToProperties() {
  store.setLayout('propertyList');
  // router.push("/property-list");
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
        <!-- <img
          src="/assets/images/richitta-logo.svg"
          alt="Rechitta Logo cursor-pointer"
          class="h-3 lg:h-5 cursor-pointer"
          @click="$router.push('/')"
        /> -->

        <div class="absolute top-12 right-8 mt-5 bg-[#90dfff] p-4 rounded-lg shadow-lg w-64"
          :style="{ 
            boxShadow: '0px 0px 100px 20px rgba(144, 223, 255, 1.5)' 
          }">
          <div class="text-blue-900 font-medium text-lg">Thank You!</div>
          <div class="text-blue-900 text-sm mt-1">
            Your interest in Unit [###] has been successfully registered.
          </div>
        </div>
      </div>
      <!-- <Transition name="slide-up" appear>
        <div  class="absolute hidden md:block md:right-5 md:bottom-2">
          <MainSection 
            :mic-text="micText"
            :multi="true"
            :is-active="isActive"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            @toggle="toggleMic"
          />
        </div>
      </Transition> -->
      <!-- <div
        class="absolute bottom-0 left-0 w-full h-[15%] md:h-[20%] text-white flex md:hidden"
        >
        <Transition name="slide-up" appear>
          <div class="relative h-full w-full">
            <div
              class="absolute left-[50%] top-[0] transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10 bg-black p-2"
            >
              <img
                src="/assets/images/chatbot.png"
                alt=""
                class="h-[60px] md:h-[80px] cursor-pointer"
              />
            </div>
            <div
              class="bg-black/80 backdrop-blur-lg footer-box h-full w-full justify-center flex items-center rounded-t-3xl pt-3"
            >
              <div class="flex gap-4 sm:gap-7 mb-3 sm:mb-0">
                <MainSection 
                  :mic-text="micText"
                  :is-active="isActive"
                  @toggle="toggleMic"
                />
              </div>
            </div>
          </div>
        </Transition>
      </div> -->
    </div>
  </div>
</template>
