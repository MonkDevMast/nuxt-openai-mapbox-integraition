<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { useRoute } from "#app";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";

useHead({
  title: "Rechitta - Property Videos",
  meta: [
    {
      name: "description",
      content:
        "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});

const route = useRoute();
const unitId = route.params.id;
const isLoading = ref(true);
const swiperInstance = ref<SwiperType | null>(null);
const activeSlideIndex = ref(0);
const videoRefs = ref<(HTMLVideoElement | null)[]>([]);

const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
  videoRefs.value[index] = el;
};

onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false;
    nextTick(() => {
      setTimeout(() => swiperInstance.value?.update(), 500);
    });
  }, 300);
});

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  
  // Pause all videos except the first one initially
  swiper.on('init', () => {
    pauseAllVideosExcept(0);
  });
  
  // Handle slide change
  swiper.on('slideChange', () => {
    activeSlideIndex.value = swiper.activeIndex;
    pauseAllVideosExcept(swiper.activeIndex);
  });
  
  // Handle click on non-active slides
  swiper.on('click', (swiper, event) => {
    const clickedIndex = Array.from(swiper.slides).indexOf(event.target.closest('.swiper-slide'));
    if (clickedIndex !== -1 && clickedIndex !== swiper.activeIndex) {
      swiper.slideTo(clickedIndex);
    }
  });
};

const pauseAllVideosExcept = (index: number) => {
  videoRefs.value.forEach((video, i) => {
    if (video) {
      if (i === index) {
        // When slide becomes active, play if not already playing
        if (video.paused) {
          video.play().catch(e => console.log("Autoplay prevented:", e));
        }
      } else {
        // Pause all other videos
        video.pause();
        video.currentTime = 0; // Reset to start
      }
    }
  });
};
</script>

<template>
  <div class="h-full flex items-center relative">
    <!-- Loading Overlay -->
    <transition name="fade">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-50">
        <!-- <div class="loading-spinner"></div> -->
      </div>
    </transition>

    <!-- Content -->
    <transition name="fade-slide">
      <Swiper
        v-if="!isLoading"
        @swiper="onSwiper"
        :modules="[Pagination]"
        :pagination="{ clickable: true }"
        :slidesPerView="1"
        :centeredSlides="true"
        :spaceBetween="0"
        :touchEventsTarget="'container'"
        :grabCursor="true"
        :breakpoints="{
          1005: {
            slidesPerView: 'auto',
            spaceBetween: 50,
          },
        }"
        class="outer-video-swiper flex items-center md:h-[32rem] w-full"
      >
        <SwiperSlide 
          v-for="i in 5" 
          :key="i" 
          class="swiper-slide-custom"
          @click="swiperInstance?.slideTo(i - 1)"
        >
          <div
            class="flex flex-col bg-white/5 backdrop-blur-xl rounded-xl shadow-lg md:py-5 md:p-5 md:px-8 md:min-w-[1000px] w-[93vw] md:w-full h-[25rem] md:h-full overflow-hidden md:transition-all duration-300 ease-in-out relative div-card"
          >
            <div class="text-white w-full mb-4 max-h-[15%]">
              <div class="flex justify-between items-center p-3">
                <div class="text-[20px] sm:text-[20px] font-medium leading-none">
                  {{ i % 2 != 0 ? "Unit Walk Through" : "Amenities Walk Through" }}
                </div>
                <div class="mt-5 mb-3">
                  <div class="font-normal text-sm text-gray-400">
                    Unit {{ unitId ?? 1905 }}
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-x-clip h-full max-h-[89%] pb-7">
              <video
                :ref="el => setVideoRef(el, i - 1)"
                controls
                class="w-full h-full object-cover rounded-lg"
                src="/assets/videos/unit-video.mp4"
                @play="activeSlideIndex === i - 1 || swiperInstance?.slideTo(i - 1)"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </transition>
  </div>
</template>

<style>
/* Your existing styles remain the same */
/* Loading Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Swiper Transition */
.fade-slide-enter-active {
  transition: all 0.5s ease 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Swiper Styling */
.outer-video-swiper {
  overflow-y: visible !important;
  overflow-x: clip !important;
}

.swiper-fade-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.outer-video-swiper .swiper-slide-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Better pagination transition */
.outer-video-swiper .swiper-pagination-bullet {
  transition: all 0.3s ease;
}

.outer-video-swiper .swiper-wrapper {
  display: flex;
  align-items: center;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.swiper-slide-custom {
  width: auto !important;
  transition: transform 0.3s ease, opacity 0.3s ease;
  /* opacity: 0.6; */
  transform: scale(0.9);
  margin: 0 15px;
  cursor: pointer;
}

.outer-video-swiper .swiper-slide-active {
  opacity: 1;
  transform: scale(1);
  height: 36rem;
}

@media (max-width: 768px) { /* Adjust the breakpoint as needed */
  .outer-video-swiper .swiper-slide-active {
    opacity: initial; /* Reset opacity */
    transform: initial; /* Reset transform */
    height: auto; /* Reset height */
  }
  .outer-video-swiper .swiper-pagination {
    bottom: 10px !important;
    left: 50%;
    transform: translateX(25%);
  }
}
@media (max-width: 400px) {
  .outer-video-swiper .swiper-pagination {
    bottom: 10px !important;
    left: 50%;
    transform: translateX(25%);
  }
}
.outer-video-swiper .swiper-pagination {
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  text-align: center;
}

.outer-video-swiper .swiper-pagination-bullet {
  background: #5c5c5c;
  width: 37.257px;
  height: 5.29px;
  border-radius: 49.633px;
  opacity: 1;
  position: relative;
  top:40px
}

.outer-video-swiper .swiper-pagination-bullet-active {
  background: #33c3f0;
}

.outer-video-swiper .div-card {
  transition: all 0.3s ease;
}

.outer-video-swiper .swiper-slide-active .div-card {
  background: #000;
  box-shadow: 0px 0px 150px 0px rgba(220, 220, 220, 0.8);
}

/* Loading Spinner */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #33c3f0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>