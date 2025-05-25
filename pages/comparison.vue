<template>
  <div class="flex justify-center relative pb-44 md:pb-0 top-20">
    <div class="flex flex-col min-h-screen items-center !w-screen md:w-[70vw] text-white p-5">
      <main class="container flex-1 p-5 bg-transparent md:bg-black rounded-xl my-2.5">
        <h1 class="text-2xl mb-5">Comparison View</h1>

        <div class="md:hidden overflow-x-auto pb-4 -mx-5 px-5">
          <div class="flex gap-5" style="width: max-content">
            <!-- Property 1 - Mobile -->
            <div class="bg-[#0e0e0e] rounded-lg p-4 flex flex-col gap-4" style="width: 80vw">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-lg font-bold">2BHK - Corner Unit</h2>
                  <p class="text-sm text-gray-400">View : Full Burj Khalifa + Downtown Skyline</p>
                </div>
                <div class="text-sm text-gray-400">Unit: 1902</div>
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
                      class="relative  w-[70vw]  rounded-2xl h-[16rem] overflow-hidden"
                      @click="toggleVideo('mobileVideo1')"
                    >
                      <video 
                        ref="mobileVideo1"
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
                        v-if="!videoStates.mobileVideo1"
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
                <span>Size: 1260 sq ft</span>
                <span>Floor 11</span>
              </div>

              <div class="flex justify-between items-center py-2.5 border-t border-b border-gray-700">
                <div>Price</div>
                <div class="font-bold">AED 2,150,000</div>
              </div>

              <div class="flex flex-col gap-2.5">
                <h3 class="text-base">Features:</h3>
                <ul class="flex flex-col gap-2 px-4">
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Smart Home Automation</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Spacious Balcony</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Premium Finishes</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Concierge Access</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Double Glazed Windows</li>
                </ul>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex border-t py-2.5 border-b border-gray-700 justify-between">
                  <span>Bedrooms</span>
                  <span>2</span>
                </div>
                <div class="flex border-b py-2.5 border-gray-700 justify-between">
                  <span>Bathrooms</span>
                  <span>2</span>
                </div>
              </div>

              <div class="flex mt-auto gap-6 py-2.5">
                <div class="flex gap-1 text-gray-100">
                  <img src="/assets/images/3dex.svg" alt="3d icon"/> <span class="text-gray-200">3D Experience</span> 
                </div>
                <div class="flex gap-1"> <img src="/assets/images/cal.svg" alt="3d icon"/> <span class="text-gray-200">Book A Visit</span></div>
              </div>
            </div>

            <!-- Property 2 - Mobile -->
            <div class="bg-[#0e0e0e] rounded-lg p-4 flex flex-col gap-4" style="width: 80vw">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-lg font-bold">2BR Duplex</h2>
                  <p class="text-sm text-gray-400">View : Pool-Facing Premium</p>
                </div>
                <div class="text-sm text-gray-400">Unit: 1905</div>
              </div>

              <div class="swiper-container outer-swiper mb-10 relative h-[16rem]">
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
                      class="relative w-[70vw] h-[16rem] rounded-2xl overflow-hidden"
                      @click="toggleVideo('mobileVideo2')"
                    >
                      <video 
                        ref="mobileVideo2"
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
                        v-if="!videoStates.mobileVideo2"
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
                    <img
                      :src="slide"
                      alt="Property Image" 
                      class="w-full h-[16rem] object-cover rounded-2xl"
                    />
                  </swiper-slide>
                </swiper>
              </div>

              <div class="flex justify-between">
                <span>Size: 1560 sq ft</span>
                <span>Podium Floor 2</span>
              </div>

              <div class="flex justify-between items-center py-2.5 border-t border-b border-gray-700">
                <div>Price</div>
                <div class="font-bold">AED 2,150,000</div>
              </div>

              <div class="flex flex-col gap-2.5">
                <h3 class="text-base">Features:</h3>
                <ul class="flex flex-col px-4 gap-2">
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Double-height Ceiling</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Private Balcony</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Walk-In Closet</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Smart Entry System</li>
                  <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Direct Amenity Access</li>
                </ul>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex border-t py-2.5 border-b border-gray-700 justify-between">
                  <span>Bedrooms</span>
                  <span>2</span>
                </div>
                <div class="flex border-b py-2.5 border-gray-700 justify-between">
                  <span>Bathrooms</span>
                  <span>2</span>
                </div>
              </div>

              <div class="flex mt-auto gap-6 py-2.5">
                <div class="flex gap-1 text-gray-100">
                  <img src="/assets/images/3dex.svg" alt="3d icon"/> <span class="text-gray-200">3D Experience</span> 
                </div>
                <div class="flex gap-1"> <img src="/assets/images/cal.svg" alt="3d icon"/> <span class="text-gray-200">Book A Visit</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop grid layout -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Property 1 - Desktop -->
          <div class="bg-[#0e0e0e] rounded-lg p-4 flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-lg font-bold">2BHK - Corner Unit</h2>
                <p class="text-sm text-gray-400">View : Full Burj Khalifa + Downtown Skyline</p>
              </div>
              <div class="text-sm text-gray-400">Unit: 1902</div>
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
              <span>Size: 1260 sq ft</span>
              <span>Floor 11</span>
            </div>

            <div class="flex justify-between items-center py-2.5 border-t border-b border-gray-700">
              <div>Price</div>
              <div class="font-bold">AED 2,150,000</div>
            </div>

            <div class="flex flex-col gap-2.5">
              <h3 class="text-base">Features:</h3>
              <ul class="flex flex-col gap-2 px-4">
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Smart Home Automation</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Spacious Balcony</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Premium Finishes</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Concierge Access</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Double Glazed Windows</li>
              </ul>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex border-t py-2.5 border-b border-gray-700 justify-between">
                <span>Bedrooms</span>
                <span>2</span>
              </div>
              <div class="flex border-b py-2.5 border-gray-700 justify-between">
                <span>Bathrooms</span>
                <span>2</span>
              </div>
            </div>

            <div class="flex mt-auto gap-6 py-2.5">
              <div class="flex gap-1 text-gray-100">
                <img src="/assets/images/3dex.svg" alt="3d icon"/> <span class="text-gray-200">3D Experience</span> 
              </div>
              <div class="flex gap-1"> <img src="/assets/images/cal.svg" alt="3d icon"/> <span class="text-gray-200">Book A Visit</span></div>
            </div>
          </div>

          <!-- Property 2 - Desktop -->
          <div class="bg-[#0e0e0e] rounded-lg p-4 flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-lg font-bold">2BR Duplex</h2>
                <p class="text-sm text-gray-400">View : Pool-Facing Premium</p>
              </div>
              <div class="text-sm text-gray-400">Unit: 1905</div>
            </div>

            <div class="swiper-container outer-swiper mb-10 relative h-[16rem]">
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
                    class="relative w-full h-[16rem] rounded-2xl overflow-hidden"
                    @click="toggleVideo('desktopVideo2')"
                  >
                    <video 
                      ref="desktopVideo2"
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
                      v-if="!videoStates.desktopVideo2"
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
                  <img
                    :src="slide"
                    alt="Property Image" 
                    class="w-full h-[16rem] object-cover rounded-2xl"
                  />
                </swiper-slide>
              </swiper>
            </div>

            <div class="flex justify-between">
              <span>Size: 1560 sq ft</span>
              <span>Podium Floor 2</span>
            </div>

            <div class="flex justify-between items-center py-2.5 border-t border-b border-gray-700">
              <div>Price</div>
              <div class="font-bold">AED 2,150,000</div>
            </div>

            <div class="flex flex-col gap-2.5">
              <h3 class="text-base">Features:</h3>
              <ul class="flex flex-col px-4 gap-2">
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Double-height Ceiling</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Private Balcony</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Walk-In Closet</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Smart Entry System</li>
                <li class="text-sm text-gray-300 relative pl-3.5 before:content-['•'] before:absolute before:left-0">Direct Amenity Access</li>
              </ul>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex border-t py-2.5 border-b border-gray-700 justify-between">
                <span>Bedrooms</span>
                <span>2</span>
              </div>
              <div class="flex border-b py-2.5 border-gray-700 justify-between">
                <span>Bathrooms</span>
                <span>2</span>
              </div>
            </div>

            <div class="flex mt-auto gap-6 py-2.5">
              <div class="flex gap-1 text-gray-100">
                <img src="/assets/images/3dex.svg" alt="3d icon"/> <span class="text-gray-200">3D Experience</span> 
              </div>
              <div class="flex gap-1"> <img src="/assets/images/cal.svg" alt="3d icon"/> <span class="text-gray-200">Book A Visit</span></div>
            </div>
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