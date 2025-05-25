<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const showTopCard = ref(false);
const showMidCard = ref(false);
const showBottomCard = ref(false);

onMounted(() => {
  setTimeout(() => (showTopCard.value = true), 100); // show top card
  setTimeout(() => (showMidCard.value = true), 800); // show middle card
  setTimeout(() => (showBottomCard.value = true), 1500); // show bottom card
});

const hideCards = () => {
  showBottomCard.value = false;
  setTimeout(() => (showMidCard.value = false), 500); // delay to allow bottom card to fade out first
  setTimeout(() => (showTopCard.value = false), 1000); // then hide top card
  // Optional: redirect or do something after everything is hidden
  setTimeout(() => {
    router.push("/property-list");
  }, 1600);
};

useHead({
  title: "Rechitta - Property Details",
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
</script>
<template>
  <div class="h-fit">
    <div
      class="flex flex-col gap-3 items-center justify-center h-full py-[200px] sm:py-[7%] w-full px-3!"
    >
      <Transition name="fade-slide-down">
        <div
          v-if="showTopCard"
          class="flex flex-col bg-black backdrop-blur-xl rounded-3xl shadow-lg py-8 px-4 md:p-9 max-w-[1300px] md:w-[70%] w-full h-full overflow-hidden transition-all duration-300 ease-in-out relative detail-card"
        >
          <!-- Header Section -->
          <div
            class="text-white w-full flex items-center justify-between gap-2 sm:gap-0 mb-4 max-h-[17%] sm:max-h-[10%]"
          >
            <div class="text-[20px] sm:text-[24px] font-medium leading-none">
              Unit #{{ route.params.id }}
            </div>
            <div class="sm:ml-auto">
              <div
                class="px-3 py-2 flex items-center border border-neutral-700 text-sm mt-2 sm:mt-0 sm:text-sm font-normal rounded-lg"
              >
                Price :
                <span>
                  <img src="/assets/images/dollar.svg" class="w-4 h-4 mx-1" />
                </span>
                2,150,000
              </div>
            </div>
          </div>

          <!-- Swiper -->
          <div class="overflow-x-clip pb-2 h-full max-h-[85%]">
            <Swiper
              :modules="[Pagination]"
              :pagination="{ clickable: true }"
              :spaceBetween="0"
              :slidesPerView="'auto'"
              :breakpoints="{
                500: {
                  slidesPerView: 'auto',
                  spaceBetween: 30,
                },
              }"
              class="inner-detail-swiper px-3 2xl:h-full h-full"
            >
              <!-- Video Slide -->
              <SwiperSlide class="w-fit! h-full relative mx-2 md:mx-0">
                <img
                  src="/assets/images/video.webp"
                  alt="Image 1"
                  class="h-full max-w-[260px] sm:max-w-[650px] 2xl:max-w-[900px] w-full object-cover rounded-2xl 2xl:h-full filter brightness-[0.6]"
                />
                <div
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <img
                    src="assets/images/video-play.svg"
                    alt="video play"
                    class="w-[40px] sm:w-[60px]"
                  />
                </div>
              </SwiperSlide>

              <!-- Image Slide -->
              <SwiperSlide class="w-fit! h-full">
                <img
                  src="/assets/images/units/unit1.png"
                  alt="Image 1"
                  class="h-full max-w-[260px] sm:max-w-[650px] 2xl:max-w-[900px] w-full object-cover rounded-2xl 2xl:h-full"
                />
              </SwiperSlide>
              <SwiperSlide class="w-fit! h-full">
                <img
                  src="/assets/images/units/unit1.png"
                  alt="Image 1"
                  class="h-full max-w-[260px] sm:max-w-[650px] 2xl:max-w-[900px] w-full object-cover rounded-2xl 2xl:h-full"
                />
              </SwiperSlide>
              <SwiperSlide class="w-fit! h-full">
                <img
                  src="/assets/images/units/unit1.png"
                  alt="Image 1"
                  class="h-full max-w-[260px] sm:max-w-[650px] 2xl:max-w-[900px] w-full object-cover rounded-2xl 2xl:h-full"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div
            class="text-sm flex align-end justify-end text-[#CBCBCB] mt-3 mr-2 sm:mr-0 h-[3%] sm:h-[5%] cursor-pointer"
          >
            <span @click="hideCards()"> View Less </span>
          </div>
        </div>
      </Transition>

      <!-- Details Section -->
      <Transition name="fade-slide-up">
        <div
          v-if="showMidCard"
          class="hide-scrollbar flex text-white gap-6 bg-black backdrop-blur-xl rounded-3xl shadow-lg py-8 px-4 sm:py-9 sm:px-9 max-w-[1300px] md:w-[70%] w-full h-full overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth transition-all duration-300 ease-in-out relative detail-card text-xs sm:text-sm"
        >
          <div class="flex items-center gap-1 flex-shrink-0">
            <Icon
              name="line-md:home-simple-twotone"
              class="text-[rgba(242,249,253,0.7)] hidden sm:block"
            />
            <span class="text-[rgba(242,249,253,0.7)]"
              >Unit Type Name : <span class="text-white">2BHK</span></span
            >
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <Icon
              name="famicons:apps-sharp"
              class="text-[rgba(242,249,253,0.7)] hidden sm:block"
            />
            <span class="text-[rgba(242,249,253,0.7)]"
              >Area : <span class="text-white">1,260 sq ft</span></span
            >
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <Icon
              name="ph:bookmark-simple"
              class="text-[rgba(242,249,253,0.7)] hidden sm:block"
            />
            <span class="text-[rgba(242,249,253,0.7)]"
              >Units Available : <span class="text-white">11</span></span
            >
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <Icon
              name="material-symbols:calendar-month-outline"
              class="text-[rgba(242,249,253,0.7)] hidden sm:block"
            />
            <span class="text-[rgba(242,249,253,0.7)]"
              >Time for Completion :
              <span class="text-white">11 months</span></span
            >
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <Icon
              name="ph:sun"
              class="text-[rgba(242,249,253,0.7)] hidden sm:block"
            />
            <span class="text-[rgba(242,249,253,0.7)]"
              >View : <span class="text-white">Burj View</span></span
            >
          </div>
        </div>
      </Transition>

      <!-- map section -->
      <Transition name="fade-slide-up">
        <div
          v-if="showBottomCard"
          class="flex flex-col bg-black backdrop-blur-xl rounded-3xl shadow-lg p-9 max-w-[1300px] md:w-[70%] w-full h-full overflow-hidden transition-all duration-300 ease-in-out relative detail-card"
        >
          <div
            class="text-white w-full text-2xl mb-4 max-h-[15%] flex items-center justify-between gap-2 sm:gap-0"
          >
            Location
          </div>
          <div class="w-full h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.249543689662!2d55.2707823150116!3d25.20484928389806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434570f1c4e3%3A0x403f651eba6edc8!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1616857199386!5m2!1sen!2sae"
              class="h-full w-full"
              style="border: 0; border-radius: 16px"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.detail-card {
  border: 2px solid #595959;
  box-shadow: 0px 0px 150px 0px rgba(167, 167, 167, 0.8);
}

.inner-detail-swiper.swiper {
  overflow-x: clip !important;
  overflow-y: visible !important;
}

.inner-detail-swiper .swiper-pagination {
  position: absolute;
  display: flex;
  bottom: -30px;
  left: 0;
  right: 0;
  text-align: center;
}
.inner-detail-swiper .swiper-pagination-bullet {
  background: rgba(56, 56, 56, 1);
  width: 37.257px;
  height: 5.29px;
  border-radius: 49.633px;
  opacity: 1;
}
.inner-detail-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #33c3f0;
}

/* Fade and slide from top */
.fade-slide-down-enter-active {
  transition: all 0.8s ease;
}
.fade-slide-down-enter-from {
  opacity: 0;
  transform: translateY(0px);
}
.fade-slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Fade and slide from bottom */
.fade-slide-up-enter-active {
  transition: all 0.8s ease;
}
.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-down-leave-active {
  transition: all 0.8s ease;
}
.fade-slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-40px); /* Slide up when leaving */
}

/* Bottom/mid card transition (fade-slide-up) */
.fade-slide-up-leave-active {
  transition: all 0.8s ease;
}
.fade-slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px); /* Slide down when leaving */
}

.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
