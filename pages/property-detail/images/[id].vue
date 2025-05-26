<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useRoute } from "#app";
import unit1 from "@/assets/images/units/unit1.png";
import unit2 from "@/assets/images/units/unit2.png";
import type { Swiper as SwiperType } from "swiper/types";

useHead({
  title: "Rechitta - Property Images",
  meta: [
    {
      name: "description",
      content: "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});

const isLoading = ref(true);
const images = [unit1, unit2];
const route = useRoute();
const unitId = route.params.id;
const swiperInstance = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  
  // Handle click on non-active slides
  swiper.on('click', (swiper, event) => {
    const clickedIndex = Array.from(swiper.slides).indexOf(event.target.closest('.swiper-slide'));
    if (clickedIndex !== -1 && clickedIndex !== swiper.activeIndex) {
      swiper.slideTo(clickedIndex);
    }
  });
};


onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <transition name="fade" mode="out-in">
      <div v-if="isLoading" key="loading">
        <!-- Loading placeholder (empty as in original) -->
      </div>
      
      <div
        v-else
        key="content"
        class="flex flex-col bg-black backdrop-blur-xl shadow-lg rounded-l-3xl mr-1 sm:mr-0 pl-5 py-5 sm:pl-9 sm:py-5 min-w-[70vw] w-full h-[40%] min-h-[400px] sm:h-[70%] overflow-hidden md:ml-[20%] ml-3 image-box"
      >
        <div class="text-white w-full mb-4 max-h-[10%] max-w-[1000px]">
          <div class="flex items-center justify-between pr-3">
            <div class="text-[16px] sm:text-[18px] font-medium leading-none">
              Interior Pictures
            </div>
            <div class="font-normal text-sm text-gray-400">
              Unit {{ unitId ?? 1905 }}
            </div>
          </div>
        </div>
        <div class="overflow-x-clip pb-9 max-h-[90%] h-full">
          <Swiper
            :modules="[Pagination]"
             @swiper="onSwiper"
            :pagination="{ clickable: true }"
            :spaceBetween="0"
            :slidesPerView="1.20"
            :breakpoints="{
              500: {
                slidesPerView: 'auto',
                spaceBetween: 30,
              },
            }"
            class="inner-image-swiper sm:px-3 h-full"
          >
            <SwiperSlide
              v-for="i in 5"
              :key="i"
              class="w-full md:w-full max-w-[700px] mx-2 sm:mx-0 h-full cursor-pointer"
            >
              <img
                :src="images[i % 2]"
                :alt="`Image ${i}`"
                class="w-full h-full object-cover rounded-2xl min-h-[200px]"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.inner-image-swiper.swiper {
  overflow-y: visible !important;
  overflow-x: clip !important;
}

.image-box {
  border: 2px solid #595959;
  box-shadow: 0px 0px 150px 0px rgba(167, 167, 167, 0.8);
}

.inner-image-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #33c3f0;
}

.inner-image-swiper .swiper-pagination {
  position: absolute;
  display: flex;
  bottom: -30px;
  left: 0;
  right: 0;
  text-align: center;
}
.inner-image-swiper .swiper-pagination-bullet {
  background: #282828;
  width: 37.257px;
  height: 5.29px;
  border-radius: 49.633px;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.swiper-pagination-horizontal {
  bottom: -30px;
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: -40px;
  top: var(--swiper-pagination-top, auto);
  left: 0;
}
</style>