<template>
  <div class="flex justify-center relative pb-44 md:pb-20 top-20">
    <div class="flex flex-col min-h-screen items-center !w-screen md:w-[70vw] text-white p-5">
      <main class="container flex-1 p-5 bg-transparent md:bg-black rounded-xl my-2.5">
        <h1 class="text-2xl mb-5">Comparison View</h1>

        <div class="md:hidden overflow-x-auto pb-4 -mx-5 px-5">
          <div class="flex gap-5" style="width: max-content">
            <div v-for="(data) in realEstateDatas">
              <PropertyMobile
                :videoStates="videoStates"
                :slides="slides"
                :data="data"
                @toggle="toggleVideo"
              />
            </div>
          </div>
        </div>

        <!-- Desktop grid layout -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Property 1 - Desktop -->
          <div v-for="(data) in realEstateDatas">
            <PropertyDesktop
              :videoStates="videoStates"
              :slides="slides"
              :data="data"
              @toggle="toggleVideo"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import unit1 from "@/assets/images/units/unit1.png";
import unit2 from "@/assets/images/units/unit2.png";
import { Pagination } from "swiper/modules";
import { ref } from 'vue';

import PropertyMobile from "~/components/comparison/PropertyMobile.vue";
import PropertyDesktop from "~/components/comparison/PropertyDesktop.vue";

const realEstateDatas = ref([
  {
    var: '2BHK - Corner Unit',
    view: 'Full Burj Khalifa + Downtown Skyline',
    unit: '1902',
    size: '1260 sq ft',
    floor: 'Floor 11',
    price: 'AED 2,150,000',
    features: [
      'Smart Home Automation',
      'Spacious Balcony',
      'Premium Finishes',
      'Concierge Access',
      'Double Glazed Windows',
    ],
    bedrooms: '2',
    bathrooms: '2',
  },
  {
    var: '2BR Duplex',
    view: 'Pool-Facing Premium',
    unit: '1905',
    size: '1560 sq ft',
    floor: 'Podium Floor 2',
    price: 'AED 2,150,000',
    features: [
      'Double-height Ceiling',
      'Private Balcony',
      'Walk-In Closet',
      'Smart Entry System',
      'Direct Amenity Access',
    ],
    bedrooms: '2',
    bathrooms: '2',
  }
]);

const slides = [
  unit1,
  unit2
];

// Video states
const videoStates = ref({
  mobileVideo1: false,
  mobileVideo2: false,
  desktopVideo1: false,
  desktopVideo2: false
});

// Video refs
const mobileVideo1 = ref(null);
const mobileVideo2 = ref(null);
const desktopVideo1 = ref(null);
const desktopVideo2 = ref(null);

const toggleVideo = (videoRefName) => {
  const videoRef = {
    mobileVideo1,
    mobileVideo2,
    desktopVideo1,
    desktopVideo2
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
.swiper {
  padding-bottom: 30px; /* Space for pagination */
}

.container {
  box-shadow: 0px 10px 60px 15px rgba(255, 255, 255, 0.2);
  width: 70vw;
}

@media (max-width: 768px) {
  .container {
    width: 100vw;
  }
  
  /* Hide scrollbar but keep functionality */
  .md\:hidden::-webkit-scrollbar {
    display: none;
  }
  
  .md\:hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

.swiper-pagination-bullet.swiper-pagination-bullet-active,
 .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #33c3f0;
}

.swiper-pagination {
  bottom: 0 !important;
}

.swiper-pagination-bullet {
  background: white !important;
  opacity: 0.5 !important;
  width: 10px !important;
  height: 10px !important;
}

.swiper-pagination-bullet-active {
  opacity: 1 !important;
}

.swiper-slide {
  transition: transform 0.3s ease;
}

.outer-mobile-swiper .swiper-pagination {
  background-color: red;
}
  
  .outer-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active,
  .outer-mobile-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #33c3f0;
  }
  
  .mobile-inner-swiper.swiper .swiper-pagination {
    display: flex;
  }
  
  .outer-swiper .swiper-pagination,
  .outer-mobile-swiper .swiper-pagination {
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  
  .outer-swiper .swiper-pagination-bullet,
  .outer-mobile-swiper .swiper-pagination-bullet {
    background: #5c5c5c;
    width: 37.257px;
    height: 5.29px;
    border-radius: 49.633px;
    opacity: 1;
  }
  
  .mobile-inner-swiper .swiper-pagination-bullet {
    background: #000;
    width: 30.257px;
    height: 5.29px;
    border-radius: 49.633px;
    opacity: 1;
  }
  
  .outer-swiper .swiper-slide-active .inner-swiper .swiper-pagination-bullet {
    background: rgba(121, 121, 121, 0.3) !important;
  }
  
  .outer-swiper
    .swiper-slide-active
    .inner-swiper
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #33c3f0 !important;
  }
  
  .inner-swiper .swiper-pagination-bullet {
    background: #000;
    width: 37.257px;
    height: 5.29px;
    border-radius: 49.633px;
    opacity: 1;
  }
   
  .swiper-slide {
    transition: transform 0.3s ease;
  }
  
  /* Mobile specific styles */

</style>