<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { computed } from 'vue';

const router = useRouter();

useHead({
  title: "Rechitta - Property List",
  meta: [
    {
      name: "description",
      content:
        "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});

const isLoading = ref(true);
const isExpanded = ref(false);
const expanded = ref(false);
const paginationVisible = computed(() => !isExpanded.value);
const outerSwiperRef = ref<any>(null);
const outerMobileSwiperRef = ref<any>(null);

// Video control refs and state
const videoRefs = ref<HTMLVideoElement[]>([]);
const videoStates = ref<{isPlaying: boolean, hovered: boolean}[]>([]);

const goToProperty = (i: number) => {
  
  const swiper = outerSwiperRef.value?.swiper;
  if (swiper) {
    swiper.allowTouchMove = false;
    swiper.mousewheel.disable();
  }

  // Pause all videos when expanding
  expanded.value = true
  isExpanded.value = true
  videoRefs.value.forEach((video, index) => {
    if (video) {
      video.pause();
      if (videoStates.value[index]) {
        videoStates.value[index].isPlaying = false;
      }
    }
  });
  
  const outerSwiper = document.querySelector(".outer-swiper.swiper") as HTMLElement;
  if (!outerSwiper) return;

  const prevSlide = outerSwiper.querySelector(
    ":scope > .swiper-wrapper > .swiper-slide-prev"
  );
  const nextSlide = outerSwiper.querySelector(
    ":scope > .swiper-wrapper > .swiper-slide-next"
  );
  const activeSlide = outerSwiper.querySelector(
    ":scope > .swiper-wrapper > .swiper-slide-active"
  );

  prevSlide?.classList.add("slide-out-left");
  nextSlide?.classList.add("slide-out-right");
  activeSlide?.classList.add("slide-up");

  setTimeout(() => {
    isExpanded.value = true;
    activeSlide?.classList.add("expanded");
    outerSwiper.classList.add("expanded");
    
    outerSwiper.style.marginBottom = "-80px";
    const pagination = outerSwiper.querySelector('.swiper-pagination') as HTMLElement;
    if (pagination) {
      pagination.style.display = 'none';
    }
  }, 600);
};

const collapseView = () => {
  const swiper = outerSwiperRef.value?.swiper;
  if (swiper) {
    swiper.allowTouchMove = true;
    swiper.mousewheel.enable();
  }
  // Pause all videos when collapsing
  expanded.value = false
  videoRefs.value.forEach((video, index) => {
    if (video) {
      video.pause();
      if (videoStates.value[index]) {
        videoStates.value[index].isPlaying = false;
      }
    }
  });

  const outerSwiper = document.querySelector(".outer-swiper.swiper") as HTMLElement;
  if (!outerSwiper) return;

  // Add transition to both detail cards
  const detailCards = document.querySelectorAll(".detail-card") as NodeListOf<HTMLElement>;
  detailCards.forEach(card => {
    card.style.transition = "transform 0.6s ease, opacity 0.5s ease";
    card.style.transform = "translateY(100px)";
    card.style.opacity = "0";
  });

  setTimeout(() => {
    const prevSlide = outerSwiper.querySelector(
      ":scope > .swiper-wrapper > .swiper-slide-prev"
    );
    const nextSlide = outerSwiper.querySelector(
      ":scope > .swiper-wrapper > .swiper-slide-next"
    );
    const activeSlide = outerSwiper.querySelector(
      ":scope > .swiper-wrapper > .swiper-slide-active"
    );

    prevSlide?.classList.remove("slide-out-left");
    nextSlide?.classList.remove("slide-out-right");
    activeSlide?.classList.remove("slide-up");
    activeSlide?.classList.remove("expanded");
    outerSwiper.classList.remove("expanded");

    activeSlide?.classList.add("slide-down");

    const pagination = outerSwiper.querySelector('.swiper-pagination') as HTMLElement;
    if (pagination) {
      pagination.style.display = 'flex';
    }

    outerSwiper.style.marginBottom = "0";

    setTimeout(() => {
      activeSlide?.classList.remove("slide-down");
      isExpanded.value = false;
    }, 400);
  }, 400);
};

const animateOnLoad = () => {
  const outerSwiper = document.querySelector(".outer-swiper.swiper");
  if (!outerSwiper) return;
  
  outerSwiper.classList.add("swiper-visible");
  
  const prevSlide = outerSwiper.querySelector(
    ":scope > .swiper-wrapper > .swiper-slide-prev"
  );
  const nextSlide = outerSwiper.querySelector(
    ":scope > .swiper-wrapper > .swiper-slide-next"
  );

  prevSlide?.classList.add("slide-in-left");
  nextSlide?.classList.add("slide-in-right");
};

const preloadImages = () => {
  return new Promise((resolve) => {
    const images = [
      '/assets/images/video.webp',
      '/assets/images/units/unit1.png',
      '/assets/images/dollar.svg',
      '/assets/images/video-play.svg'
    ];

    let loaded = 0;
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === images.length) resolve(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === images.length) resolve(true);
      };
    });
  });
};

// Improved video control functions
const toggleVideo = (index: number, event: Event) => {
  event.stopPropagation();
  const video = videoRefs.value[index];
  if (!video) return;
  
  if (video.paused) {
    video.play().catch(e => console.error("Video play failed:", e));
  } else {
    video.pause();
  }
};

const onVideoPlay = (index: number) => {
  if (videoStates.value[index]) {
    videoStates.value[index].isPlaying = true;
  }
};

const onVideoPause = (index: number) => {
  if (videoStates.value[index]) {
    videoStates.value[index].isPlaying = false;
  }
};

const onVideoEnded = (index: number) => {
  const video = videoRefs.value[index];
  if (video && videoStates.value[index]) {
    video.currentTime = 0;
    videoStates.value[index].isPlaying = false;
  }
};

const setVideoHover = (index: number, hovered: boolean) => {
  if (videoStates.value[index]) {
    videoStates.value[index].hovered = hovered;
  }
};

watch(expanded, (newVal) => {
  const swiper = outerSwiperRef.value?.swiper;
  if (!swiper) return;

  swiper.allowTouchMove = !newVal;
  
  swiper.updateSize();
  swiper.updateSlides();
  
  swiper.mousewheel.disable();
  if (!newVal) swiper.mousewheel.enable();
});


const onSlideChange = (swiper: any) => {
  // Pause all videos
  videoRefs.value.forEach((video, index) => {
    if (video) {
      video.pause();
      if (videoStates.value[index]) {
        videoStates.value[index].isPlaying = false;
      }
    }
  });
};

const onContentClick = (swiper: any, event: MouseEvent, slideIndex: number) => {
 

  console.log(swiper)
  const activeIndex = swiper.activeIndex;
  
  if (activeIndex !== slideIndex) {
    const clickedSlide = swiper.slides[slideIndex];
    const currentActiveSlide = swiper.slides[activeIndex];
    
    if (clickedSlide && currentActiveSlide) {
      clickedSlide.classList.add('slide-to-center');
      currentActiveSlide.classList.add('slide-out');
    }
    
    swiper.slideTo(slideIndex);
    return;
  }
  
  // goToProperty(slideIndex + 1);
};

const onMobileSwiperClick = (swiper: any, event: MouseEvent) => {
  if (isExpanded.value) return;

  const clickedSlide = (event.target as HTMLElement).closest('.swiper-slide');
  if (!clickedSlide) return;

  const viewMoreBtn = (event.target as HTMLElement).closest('.view-more-button');
  if (viewMoreBtn) return;

  const videoElement = (event.target as HTMLElement).closest('video');
  const videoControls = (event.target as HTMLElement).closest('.video-play-button');
  if (videoElement || videoControls) {
    event.stopPropagation();
    return;
  }

  const slideIndex = Array.from(swiper.slides).indexOf(clickedSlide);
  
  if (!clickedSlide.classList.contains('swiper-slide-active')) {
    const currentActiveSlide = swiper.slides[swiper.activeIndex];
    
    if (clickedSlide && currentActiveSlide) {
      clickedSlide.classList.add('slide-to-center');
      currentActiveSlide.classList.add('slide-out');
    }
    
    swiper.slideTo(slideIndex);
    return;
  }
  
  // goToProperty(slideIndex + 1);
};

const onTouchStart = (swiper: any) => {
  
};

const onSwiperClick = (swiper: any, event: MouseEvent) => {
  // Check if the click originated from the inner swiper
  const innerSwiper = (event.target as HTMLElement).closest('.inner-swiper');
  if (innerSwiper) {
    event.stopPropagation();
    return;
  }

  if (isExpanded.value) return;

  const clickedSlide = (event.target as HTMLElement).closest('.swiper-slide');
  if (!clickedSlide) return;

  // Check if click was on the view more button
  const viewMoreBtn = (event.target as HTMLElement).closest('.view-more-button');
  if (viewMoreBtn) return;

  // Check if click was on video controls
  const videoElement = (event.target as HTMLElement).closest('video');
  const videoControls = (event.target as HTMLElement).closest('.video-play-button');
  if (videoElement || videoControls) {
    event.stopPropagation();
    return;
  }

  // Only allow slide switching
  if (!clickedSlide.classList.contains('swiper-slide-active')) {
    const slideIndex = Array.from(swiper.slides).indexOf(clickedSlide);
    swiper.slideTo(slideIndex);
  }
};

// Add this new function to handle inner swiper slide change
const onInnerSwiperSlideChange = (swiper: any) => {
  const outerSwiper = outerSwiperRef.value?.swiper;
  if (!outerSwiper) return;

  // Check if we're at the last slide of inner swiper
  if (swiper.isEnd) {
    // Slide to next slide in outer swiper
    outerSwiper.slideNext();
    // Reset inner swiper to first slide
    swiper.slideTo(0);
  }
};

onMounted(async () => {
  // Initialize video states for all slides
  videoStates.value = Array(5).fill(null).map(() => ({
    isPlaying: false,
    hovered: false
  }));
  
  await preloadImages();
  
  setTimeout(() => {
    isLoading.value = false;
    
    setTimeout(() => {
      animateOnLoad();
    }, 50);
  }, 200);
});
</script>

<template>
  <div class="h-full flex flex-col !ml-2 md:ml-0 justify-center items-center relative">
    <!-- Loading overlay -->
    <transition name="fade">
      <div v-if="isLoading" class="">
        <!-- <div class="loading-spinner"></div> -->
      </div>
    </transition>

    <!-- Main content container -->
    <div class="w-full flex-1 flex flex-col items-center justify-center relative ">
      <!-- Swiper container -->
      <div :class="`w-full h-50 flex  items-center justify-center relative `">
        <!-- Desktop Swiper -->
        <Swiper
          ref="outerSwiperRef"
          :effect="'coverflow'"
          :modules="[EffectCoverflow, ...(isExpanded ? [] : [Pagination])]"
          :pagination="!isExpanded ? { clickable: true, enabled: paginationVisible } : false"
          :slidesPerView="'auto'"
          :spaceBetween="30"
          :centeredSlides="true"
          :loop="true"
          :allowTouchMove="!expanded"
          :freeMode="!isExpanded"
          :initialSlide="1"
          :mousewheel="{
            enabled: true,
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 50,
            thresholdTime: 500
          }"
          :coverflowEffect="{
            rotate: 0,
            stretch: -100,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }"
           @click="(swiper, event) => onSwiperClick(swiper, event)"
          @slideChange="onSlideChange"
          @touchStart="(swiper) => onTouchStart(swiper)"
          
          :class="`outer-swiper h-[70vh] hidden! md:block! w-full max-w-none`"
        >
          <SwiperSlide
            v-for="i in 5"
            :key="i"
            class="max-w-fit h-full mr-2 xl:mx-0"
            @click.stop=""
          >
            <div
              class="flex flex-col bg-black md:bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg py-5 md:p-9 max-w-[1200px] w-full h-full overflow-hidden transition-all duration-300 ease-in-out relative div-card"
              @click="(event) => onContentClick(outerSwiperRef.swiper, event, i-1)"
            >
              <div
                class="text-white w-full flex items-center justify-between gap-2 sm:gap-0 mb-4 max-h-[17%] sm:max-h-[10%]"
              >
                <div class="text-[20px] sm:text-[24px] font-medium leading-none">
                  Unit #170{{ i }} 
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
              <div class="overflow-x-clip pb-2 h-full max-h-[85%]">
                <Swiper
                  :modules="[Pagination]"
                  :pagination="{ clickable: true }"
                  :spaceBetween="10"
                  :slidesPerView="1"
                  :breakpoints="{
                    500: {
                      slidesPerView: 'auto',
                      spaceBetween: 10,
                    },
                  }"
                  @click.stop
                  @touchStart.stop
                  @slideChange="onInnerSwiperSlideChange"
                  class="inner-swiper px-3 2xl:h-full h-full"
                >
                  <!-- Video Slide -->
                  <SwiperSlide 
                    class="w-[650px]! h-full relative mx-2 md:mx-0 video-container"
                    @mouseenter="setVideoHover(i-1, true)"
                    @mouseleave="setVideoHover(i-1, false)"
                  >
                    <video
                      :ref="el => videoRefs[i-1] = el as HTMLVideoElement"
                      controls
                      class="w-full h-full object-cover rounded-lg"
                      src="/assets/videos/unit-video.mp4"
                      @play="onVideoPlay(i-1)"
                      @pause="onVideoPause(i-1)"
                      @ended="onVideoEnded(i-1)"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div
                      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 video-play-button"
                      @click="toggleVideo(i-1, $event)"
                    >
                      <img 
                        src="assets/images/video-play.svg" 
                        alt="video play" 
                        :class="{'opacity-0': videoStates[i-1]?.isPlaying && !videoStates[i-1]?.hovered, 'opacity-100': !videoStates[i-1]?.isPlaying || videoStates[i-1]?.hovered}"
                        class="transition-opacity duration-300"
                      />
                    </div>
                  </SwiperSlide>

                  <!-- Image Slides -->
                  <SwiperSlide class="w-[650px]! h-full">
                    <img
                      src="/assets/images/units/unit1.png"
                      alt="Image 1"
                      class="h-full w-full object-cover rounded-2xl 2xl:h-full"
                    />
                  </SwiperSlide>
                  <SwiperSlide class="w-[650px]! h-full">
                    <img
                      src="/assets/images/units/unit1.png"
                      alt="Image 1"
                      class="h-full w-full object-cover rounded-2xl 2xl:h-full"
                    />
                  </SwiperSlide>
                  <SwiperSlide class="w-[650px]! h-full">
                    <img
                      src="/assets/images/units/unit1.png"
                      alt="Image 1"
                      class="h-full w-full object-cover rounded-2xl 2xl:h-full"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div class="w-full flex justify-end">
                <div
                @click.stop="isExpanded ? collapseView() : goToProperty(i)"
                class="text-sm flex align-end  w-fit justify-end text-[#CBCBCB] mt-3 mr-2 sm:mr-0 h-[3%] cursor-pointer sm:h-[5%] view-more-button"
              >
                <span>
                  {{ isExpanded ? 'Show Less' : 'View More' }}
                </span>
              </div>
              </div>
             
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Mobile Swiper -->
        <Swiper
          ref="outerMobileSwiperRef"
          :modules="[Pagination, EffectCoverflow]"
          :pagination="{ clickable: true }"
          :slidesPerView="1"
          :spaceBetween="20"
          :centeredSlides="true"
          :loop="true"
          :allowTouchMove="!isExpanded"
          :freeMode="!isExpanded"
          :grabCursor="true"
          :mousewheel="true" 
          @slideChange="onSlideChange"
          @touchStart="(swiper) => onTouchStart(swiper)"
          class="outer-mobile-swiper mb-44 md:mb-9 h-[24rem]  md:h-full md:hidden! px-3! sm:mb-0"
        >
          <SwiperSlide
            v-for="i in 5"
            :key="i"
            class=" h-full mr-2 py-5  pl-1 md:pl-0 xl:mx-0"
            @click.stop=""
            
          >
            <div
           :style="{ boxShadow: '0px 0px 150px 0px rgba(167, 167, 167, 0.5) !important' }"
            
              class="flex flex-col rounded-3xl py-10 px-4 md:p-9 max-w-[70rem] w-full h-full overflow-hidden cursor-pointer transition-all duration-300 ease-in-out relative div-card"
              @click="(event) => onContentClick(outerMobileSwiperRef.swiper, event, i-1)"
            >
              <div
                class="text-white w-full flex items-center justify-between gap-2 sm:gap-0 mb-4 max-h-[17%] sm:max-h-[10%]"
              >
                <div class="text-[20px] sm:text-[24px] font-medium leading-none">
                  Unit #170{{ i }}
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
              <div class="overflow-x-clip pb-9 h-[20rem]">
                <Swiper
                  :modules="[Pagination]"
                  :pagination="{ clickable: true }"
                  :spaceBetween="0"
                  :slidesPerView="'auto'"
                  
                  :breakpoints="{
                    500: {
                      slidesPerView: 'auto',
                      spaceBetween: 10,
                      
                    },
                  }"
                  class="mobile-inner-swiper px-3  !h-[10rem] space-x-24 "
                >
                  <!-- Video Slide -->
                  <SwiperSlide 
                    class=" !h-[15rem] !w-[70vw] relative mr-2 md:mx-0 video-container"
                    @touchstart="setVideoHover(i-1, true)"
                    @touchend="setVideoHover(i-1, false)"
                  >
                    <video
                      :ref="el => videoRefs[i-1] = el as HTMLVideoElement"
                      controls
                      class="w-full h-[10rem] object-cover rounded-lg"
                      src="/assets/videos/unit-video.mp4"
                      @play="onVideoPlay(i-1)"
                      @pause="onVideoPause(i-1)"
                      @ended="onVideoEnded(i-1)"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div
                      v-if="(videoStates[i-1]?.hovered || !videoStates[i-1]?.isPlaying) && outerMobileSwiperRef?.swiper?.activeIndex === i-1"
                      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 video-play-button"
                      @click="toggleVideo(i-1, $event)"
                    >
                      <img 
                        src="assets/images/video-play.svg" 
                        alt="video play" 
                        class="w-[40px]"
                        :class="{'opacity-0': videoStates[i-1]?.isPlaying && !videoStates[i-1]?.hovered, 'opacity-100': !videoStates[i-1]?.isPlaying || videoStates[i-1]?.hovered}"
                      />
                    </div>
                  </SwiperSlide>

                  <!-- Image Slides -->
                  <SwiperSlide class="w-[]! h-full mr-2">
                    <img
                      src="/assets/images/units/unit1.png"
                      alt="Image 1"
                      class="h-full w-full object-cover rounded-2xl 2xl:h-full"
                    />
                  </SwiperSlide>
                  <SwiperSlide class="w-[250px]! h-full mr-2">
                    <img
                      src="/assets/images/units/unit1.png"
                      alt="Image 1"
                      class="h-full w-full object-cover rounded-2xl 2xl:h-full"
                    />
                  </SwiperSlide>
                  <SwiperSlide class="w-[250px]! h-full mr-2">
                    <img
                      src="/assets/images/units/unit1.png"
                      alt="Image 1"
                      class="h-full w-full object-cover rounded-2xl 2xl:h-full"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div
                @click.stop="isExpanded ? collapseView() : goToProperty(i)"
                class="text-sm flex align-end mt-4 ml-2 md: ml-0 justify-start md:justify-end text-[#CBCBCB] md:mt-3 mr-2 sm:mr-0 h-[3%] cursor-pointer sm:h-[5%] view-more-button"
              >
                <span>
                  {{ isExpanded ? 'Show Less' : 'View More' }}
                </span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    </div>
   
    <div class="flex justify-center relative bottom-[15rem] mb-44 md:bottom-32">
      <transition name="fade-slide">
        <div 
          v-if="isExpanded" 
          class="w-full max-w-[1300px] md:w-[73rem] px-4 mt-4 relative mb-10"
        >
          <!-- Mid Card -->
          <div 
            :style="{ boxShadow: '0px 0px 150px 0px rgba(167, 167, 167, 0.5)' }"
            class="hide-scrollbar flex text-white gap-6 bg-black backdrop-blur-xl rounded-3xl shadow-lg py-8 px-4 sm:py-9 pr-8 md:px-9 w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth transition-all duration-300 ease-in-out relative detail-card text-xs sm:text-sm mb-8"
          >
            <div class="flex items-center gap-1 flex-shrink-0">
              <Icon name="line-md:home-simple-twotone" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
              <span class="text-[rgba(242,249,253,0.7)]">Unit Type Name : <span class="text-white">2BHK</span></span>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
              <Icon name="famicons:apps-sharp" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
              <span class="text-[rgba(242,249,253,0.7)]">Area : <span class="text-white">1,260 sq ft</span></span>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
              <Icon name="ph:bookmark-simple" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
              <span class="text-[rgba(242,249,253,0.7)]">Units Available : <span class="text-white">11</span></span>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
              <Icon name="material-symbols:calendar-month-outline" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
              <span class="text-[rgba(242,249,253,0.7)]">Time for Completion : <span class="text-white">11 months</span></span>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
              <Icon name="ph:sun" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
              <span class="text-[rgba(242,249,253,0.7)]">View : <span class="text-white">Burj View</span></span>
            </div>
          </div>

          <!-- Map Section -->
          <div
            :style="{ boxShadow: '0px 10px 60px 15px rgba(255, 255, 255, 0.4)' }"
            class="flex flex-col bg-black backdrop-blur-xl rounded-3xl shadow-lg p-9 w-full overflow-hidden transition-all duration-300 ease-in-out relative detail-card"
          >
            <div class="text-white w-full text-2xl mb-4 max-h-[15%] flex items-center justify-between gap-2 sm:gap-0">
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
        </div>
      </transition>
    </div>
</template>

<style >
/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #33c3f0;
  animation: spin 1s ease-in-out infinite;
}

.detail-card {
  position: relative;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  transition: transform 0.4s ease, opacity 0.3s ease;
}

@media (max-width: 750px) {
  .detail-card {
    bottom: 120px;
  }
}

@media (max-width: 450px) {
  .detail-card {
    bottom: 80px;
  }
}

@media (max-width: 360px) {
  .detail-card {
    bottom: 40px;
  }
}

@media (min-width: 2000px) {
  .detail-card {
    bottom: 10px;
  }
}

@media (min-width: 2800px) {
  .detail-card {
    bottom: 100px;
  }
}

.detail-card::before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: rgba(51, 195, 240, 0.2);
  filter: blur(20px);
  opacity: 0;
  border-radius: inherit;
  z-index: -1;
  transition: opacity 0.4s ease;
}

.detail-card.glowing::before {
  opacity: 1;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Swiper styles */
.outer-swiper.swiper {
  overflow-y: visible !important;
  overflow-x: clip !important;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  position: absolute;
  z-index: 10;
}

.outer-swiper.swiper.swiper-visible {
  opacity: 1;
  visibility: visible;
}

.outer-swiper.swiper.expanded {
  transition: margin-bottom 0.3s ease;
}

.outer-mobile-swiper {
  /* box-shadow: 0px 0px 100px 0px rgba(167, 167, 167, 0.4) */
}
.outer-swiper .swiper-slide {
  width: auto !important;
  height: 100% !important;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.outer-swiper .swiper-slide:not(.swiper-slide-active) {
  transition: transform 0.5s ease;
}

.outer-swiper .swiper-pagination,
.outer-mobile-swiper .swiper-pagination {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) { 
  .outer-mobile-swiper .swiper-pagination {
    margin-bottom: 10px;
    justify-content: start; 
  }
}

.outer-swiper .swiper-pagination-bullet,
.outer-mobile-swiper .swiper-pagination-bullet {
  background: #5c5c5c;
  width: 37.257px;
  height: 5.29px;
  border-radius: 49.633px;
  opacity: 1;
}

.outer-swiper .swiper-slide-active .div-card.expanded {
  width: 20rem !important;
  transform: translateY(-10px);
  transition: transform 0.3s ease;
}
.outer-swiper .swiper-slide-active .div-card {
  background: #000;
  box-shadow: 0px 0px 150px 0px rgba(167, 167, 167, 0.5);
  transform: scale(0.95);
  position: relative;
  z-index: 30;
}

.outer-swiper .swiper-slide:not(.swiper-slide-active) .div-card {
  box-shadow: 0px 0px 100px 0px rgba(167, 167, 167, 0.4);
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
}

.slide-down {
  animation: slideDown 0.4s ease-out forwards;
}

.detail-card {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.outer-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active,
.outer-mobile-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #33c3f0;
}

.mobile-inner-swiper.swiper {
  overflow-x: visible !important;
  overflow-y: visible !important;
}

.mobile-inner-swiper.swiper .swiper-pagination {
  display: flex;
}

.inner-swiper.swiper {
  overflow-x: clip !important;
  overflow-y: visible !important;
}

.inner-swiper .swiper-pagination {
  position: absolute;
  display: flex;
  bottom: -30px;
  left: 0;
  justify-content: flex-start;
  padding-left: 20px;
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

/* Video controls specific styles */
video::-webkit-media-controls {
  display: flex !important;
  opacity: 1 !important;
}

.video-play-button {
  pointer-events: none;
  z-index: 10;
}

.video-play-button img {
  pointer-events: auto;
}

video::-webkit-media-controls-play-button {
  display: none;
}

video:not([controls]):paused + .video-play-button,
video[controls]:paused:not(:hover) + .video-play-button {
  opacity: 1;
  visibility: visible;
}

video[controls]:hover + .video-play-button {
  opacity: 0;
  visibility: hidden;
}

.view-more-button {
  z-index: 20;
}

@media (max-width: 768px) {
  .outer-swiper.swiper {
    overflow-y: clip !important;
    overflow-x: visible !important;
  }
  .video-play-button img {
    width: 60px !important;
    height: 60px !important;
  }
}

/* Animation styles */
@keyframes slideInLeft {
  from {
    transform: translate3d(-100vw, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(-205px, 0px, -307.5px);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translate3d(100vw, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(205px, 0px, -307.5px);
    opacity: 1;
  }
}

@keyframes slideOutLeft {
  from {
    transform: translate3d(-205px, 0px, -307.5px);
    opacity: 1;
  }
  to {
    transform: translate3d(-100vw, 0, 0);
    opacity: 0;
  }
}
 

@keyframes slideOutRight {
  from {
    transform: translate3d(205px, 0px, -307.5px);
    opacity: 1;
  }
  to {
    transform: translate3d(100vw, 0, 0);
    opacity: 0;
  }
}

.slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}

.slide-in-right {
  animation: slideInRight 0.5s ease-out forwards;
}

.slide-out-left {
  animation: slideOutLeft 0.5s ease-in forwards;
}

.slide-out-right {
  animation: slideOutRight 0.5s ease-in forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
  }
}

.slide-up {
  animation: slideUp 0.5s ease-out forwards;
  position: relative;
  z-index: 20;
}

/* Details panel transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Scrollbar hiding */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Improved touchpad scrolling */
.outer-swiper .swiper-wrapper,
.outer-mobile-swiper .swiper-wrapper {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  touch-action: pan-x;
}

/* Better click handling */
.swiper-slide {
  user-select: none;
}

/* Add these styles to the existing CSS section */
 
.outer-mobile-swiper .swiper-slide:not(.swiper-slide-active) .div-card {
  /* Remove this style */
}

.outer-mobile-swiper.swiper{
  box-shadow: 0px 0px 100px 0px rgba(167, 167, 167, 0.4) ;

}

 

/* Update the media query to remove the override */
@media (max-width: 768px) {
  .outer-swiper.swiper {
    overflow-y: clip !important;
    overflow-x: visible !important;
  }
  /* Remove or comment out this override
  .outer-swiper .swiper-slide-active .div-card {
    border: 0px;
    background: rgba(121, 121, 121, 0.3);
    box-shadow: none;
  }
  */
  .video-play-button img {
    width: 60px !important;
    height: 60px !important;
  }
}

/* Update video controls to work on all mobile slides */
.video-container video {
  pointer-events: auto;
}

/* Remove active slide restriction for video controls */
.swiper-slide:not(.swiper-slide-active) .video-play-button {
  display: block;
}

/* Add shadow to all mobile swiper cards */
 

/* Update mobile swiper styles */
.outer-mobile-swiper.swiper {
  overflow: hidden !important;
}

.outer-mobile-swiper .swiper-slide {
  width: 100% !important;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.outer-mobile-swiper .swiper-slide-active {
  opacity: 1;
}

.outer-mobile-swiper .swiper-slide-active .div-card {
  background: #000;
  
  position: relative;
  z-index: 30;
}

/* Add glow effect to active mobile slide */
.outer-mobile-swiper .swiper-slide-active .div-card::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  border-radius: 24px;
  z-index: -1;
  filter: blur(10px);
}

/* Add these styles to prevent outer swiper interaction when using inner swiper */
.inner-swiper {
  pointer-events: auto;
  touch-action: pan-x;
}

.inner-swiper .swiper-wrapper {
  touch-action: pan-x;
}

/* Ensure inner swiper touch events don't propagate */
.inner-swiper * {
  touch-action: pan-x;
}

</style>