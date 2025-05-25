<template>
    <img src="../assets/images//layout-bg.png" class="absolute inset-0 top-0 left-0 w-full h-full object-cover"/>
  
    <div class="flex flex-col min-h-screen items-center text-white font-sans relative">
      <!-- Header -->
      <div class="absolute z-50 top-0 left-0 w-full flex justify-between items-center pt-5 sm:pt-4 pb-5 sm:pb-7 px-5 sm:px-9 lg:h-[15vh] h-[10%]  sm:bg-transparent">
        <img
          src="/assets/images/richitta-logo.svg"
          alt="Rechitta Logo"
          class="h-3 sm:h-5 cursor-pointer"
          @click="navigateHome"
        />
      </div>
  
      <!-- Mobile Layout (form first, then card) -->
      <div class="w-full mt-32 md:mt-0 px-5 pb-20 md:hidden flex flex-col gap-6">
        <!-- Form -->
        <div 
          class="bg-[#111111] rounded-xl p-6 w-full"
          :style="{ boxShadow: '0px 10px 60px 15px rgba(255, 255, 255, 0.4)' }"
        >
          <h2 class="text-xl font-semibold mb-2 font-machina-plain">Register Your Interest</h2>
          <p class="text-[#999999] mb-6 text-sm">Let us know what you're looking for</p>
          
          <form @submit.prevent="submitForm">
            <InputField
              label="Full Name"
              placeholder="Timothy Ricks"
              :modelValue="formData.fullName"
              @update:modelValue="$event => (formData.fullName = $event)"
              :required="true"
            />
            <InputField
              label="Email"
              placeholder="Enter your Email"
              :modelValue="formData.email"
              @update:modelValue="$event => (formData.email = $event)"
              :required="true"
              class="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333333] text-[#50B9E0] text-sm placeholder-[#666666] focus:border-[#50B9E0] focus:outline-none"
            />
            <InputField
              variant="tel"
              label="Contact Number"
              placeholder="Enter your Number"
              :modelValue="formData.contactNumber"
              @update:modelValue="$event => (formData.contactNumber = $event)"
            />
            <InputField
              label="Unit Number"
              placeholder="1702 (Select / Search From Available Units)"
              :modelValue="formData.unitNumber"
              @update:modelValue="$event => (formData.unitNumber = $event)"
              :required="true"
            />
            <InputField
              label="Broker Name"
              placeholder="Broker Name (auto select)"
              :modelValue="formData.brokerName"
              @update:modelValue="$event => (formData.brokerName = $event)"
              :readonly="true"
              :arrowIcon="true"
            />
            <InputField
              label="Broker Agency"
              type="text"
              placeholder="Broker Agency (auto select)"
              :modelValue="formData.brokerAgency"
              @update:modelValue="$event => (formData.brokerAgency = $event)"
              :readonly="true"
              :arrowIcon="true"
            />
            
            <button @click="submit" type="submit" class="w-full py-2 bg-[#50B9E0] text-black border-none rounded-md font-medium cursor-pointer transition-colors hover:bg-[#3da5d4]">
              Submit Interest
            </button>
          </form>
        </div>
  
        <!-- Property Card -->
        <div class="bg-[#111111] rounded-xl p-6 w-full"
        :style="{ boxShadow: '0px 10px 60px 15px rgba(255, 255, 255, 0.4)' }"
        
        >
          <h2 class="text-xl font-semibold mb-6">Unit #1701</h2>
          
          <div class="swiper-container outer-swiper relative h-[18rem]"
          >
            <swiper
              :modules="[Pagination]"
              :pagination="{ clickable: true }"
              :slides-per-view="1.2"
              :space-between="10"
              class="rounded-lg"
              
            >
              <swiper-slide>
                <div class="relative w-full rounded-2xl h-[18rem] overflow-hidden">
                  <video 
                    class="w-[80vw] h-full object-cover"
                    autoplay
                    muted
                    loop
                    playsinline
                  >
                    <source src="/assets//videos//unit-video.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                  <div class="absolute inset-0 flex items-center justify-center">
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
              
              <swiper-slide v-for="(slide, index) in slides" :key="index">
                <img
                  :src="slide"
                  alt="Property Image" 
                  class="w-full object-cover rounded-2xl h-[18rem]"
                />
              </swiper-slide>
            </swiper>
          </div>
          
          <div class="flex flex-col gap-3 mt-8 md:mt-4">
            <div class="flex items-center gap-2 text-sm text-[#cccccc]">
              <Icon name="line-md:home-simple-twotone" class="text-[rgba(242,249,253,0.7)]" />
              <span>Unit Type Name :asdf 2BHK</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#cccccc]">
              <Icon name="famicons:apps-sharp" class="text-[rgba(242,249,253,0.7)]" />
              <span>Area : 1260 sq ft</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#cccccc]">
              <Icon name="ph:bookmark-simple" class="text-[rgba(242,249,253,0.7)]" />
              <span>Units Available : 11</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#cccccc]">
              <Icon name="material-symbols:calendar-month-outline" class="text-[rgba(242,249,253,0.7)]" />
              <span>Time for Completion : 11 mon</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Desktop Layout (original layout) -->
      <div class="hidden md:grid grid-cols-6 flex-1 px-8 gap-8 max-w-screen mx-auto w-full"
      
      >
        <div class="col-span-4 flex items-center justify-center"
        
        >
          <div class="flex-1 col-span-4 bg-[#111111] rounded-xl p-8 flex flex-col max-w-[60rem]"
      :style="{ boxShadow: '0px 10px 60px 15px rgba(255, 255, 255, 0.4)' }"
          
          >
            <h2 class="text-xl font-semibold mb-6">Unit #1701</h2>
            
            <div class="swiper-container outer-swiper relative h-[24rem]"
            >
              <swiper
                :modules="[Pagination]"
                :pagination="{ clickable: true }"
                :slides-per-view="1.2"
                :space-between="10"
                class="rounded-lg"
              >
                <swiper-slide>
                  <div class="relative  rounded-2xl h-[24rem] overflow-hidden">
                    <video 
                      class="w-full h-full object-cover"
                      autoplay
                      muted
                      loop
                      playsinline
                    >
                      <source src="/assets//videos//unit-video.mp4" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                    <div class="absolute inset-0 flex items-center justify-center">
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
                
                <swiper-slide v-for="(slide, index) in slides" :key="index">
                  <img
                    :src="slide"
                    alt="Property Image" 
                    class="w-full object-cover rounded-2xl h-[24rem]"
                  />
                </swiper-slide>
              </swiper>
            </div>
            
            <div class="flex justify-between md:mt-8 flex-wrap">
              <div class="flex items-center gap-2 text-sm text-[#cccccc] mb-2">
                <Icon name="line-md:home-simple-twotone" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
                <span>Unit Type Name : 2BHK</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#cccccc] mb-2">
                <Icon name="famicons:apps-sharp" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
                <span>Area : 1260 sq ft</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#cccccc] mb-2">
                <Icon name="ph:bookmark-simple" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
                <span>Units Available : 11</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#cccccc] mb-2">
                <Icon name="material-symbols:calendar-month-outline" class="text-[rgba(242,249,253,0.7)] hidden sm:block" />
                <span>Time for Completion : 11 mon</span>
              </div>
            </div>
          </div>
        </div>
      
        <div class="col-span-2 flex justify-end">
          <div 
            class="flex-1 bg-[#111111] min-w-[29rem] max-w-[29rem] rounded-xl p-8 flex flex-col justify-center px-20"
            :style="{ boxShadow: '0px 10px 60px 15px rgba(255, 255, 255, 0.4)' }"
          >
            <h2 class="text-xl font-semibold mb-2 font-machina-plain">Register Your Interest</h2>
            <p class="text-[#999999] mb-6 text-sm">Let us know what you're looking for</p>
            
            <form @submit.prevent="submitForm">
              <InputField
                label="Full Name"
                placeholder="Timothy Ricks"
                :modelValue="formData.fullName"
                @update:modelValue="$event => (formData.fullName = $event)"
                :required="true"
              />
              <InputField
                label="Email"
                placeholder="Enter your Email"
                :modelValue="formData.email"
                @update:modelValue="$event => (formData.email = $event)"
                :required="true"
                class="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333333] text-[#50B9E0] text-sm placeholder-[#666666] focus:border-[#50B9E0] focus:outline-none"
              />
              <InputField
                variant="tel"
                label="Contact Number"
                placeholder="Enter your Number"
                :modelValue="formData.contactNumber"
                @update:modelValue="$event => (formData.contactNumber = $event)"
              />
              <InputField
                label="Unit Number"
                placeholder="1702 (Select / Search From Available Units)"
                :modelValue="formData.unitNumber"
                @update:modelValue="$event => (formData.unitNumber = $event)"
                :required="true"
              />
              <InputField
                label="Broker Name"
                placeholder="Broker Name (auto select)"
                :modelValue="formData.brokerName"
                @update:modelValue="$event => (formData.brokerName = $event)"
                :readonly="true"
                :arrowIcon="true"
              />
              <InputField
                label="Broker Agency"
                type="text"
                placeholder="Broker Agency (auto select)"
                :modelValue="formData.brokerAgency"
                @update:modelValue="$event => (formData.brokerAgency = $event)"
                :readonly="true"
                :arrowIcon="true"
              />
              
              <button @click="submit" type="submit" class="w-full py-2 bg-[#50B9E0] text-black border-none rounded-md font-medium cursor-pointer transition-colors hover:bg-[#3da5d4]">
                Submit Interest
              </button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Footer (Desktop only) -->
      <div
        class="absolute bottom-0 left-0 w-full justify-between items-center px-9 item-center pb-6 pt-5 h-[13%] text-white hidden md:flex"
      >
        <div @click="navigateHome" class="flex items-center gap-3">
          <img
            src="/assets/videos/orb.gif"
            alt=""
            class="h-[85px] md:h-[85px] cursor-pointer"
          />
         
          <p
            class="font-['DM Sans'] text-sm font-normal text-[#CBCBCB] cursor-pointer"
          >
            Get back to Rechitta
          </p>
        </div>
        <Transition name="slide-up" appear>
          <div class="relative right-[30%] bottom-10">
            <MainSection 
              :mic-text="micText"
              :multi="true"
              :is-active="isActive"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
              @toggle="toggleMic"
            />
          </div>
        </Transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { VueTelInput } from 'vue-tel-input';
  import 'vue-tel-input/vue-tel-input.css';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import unit1 from "@/assets/images/units/unit1.png";
  import unit2 from "@/assets/images/units/unit2.png";
  import { Pagination } from "swiper/modules";
  import MainSection from '~/components/VoiceInput.vue';
  import InputField from '~/components/InputField.vue';
  const router = useRouter();
  
  definePageMeta({
    layout: 'blank',
  });
  
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
  
  const isActive = ref(false);
  
  const navigateHome = () => {
    router.push('/')
  }
  
  const toggleMic = () => {
    isActive.value = !isActive.value;
    isTransitioning.value = true;
    setTimeout(() => {
      goToProperties();
    }, 500);
  };
  
  const submit = () => {
    router.push("/confirmation");
  };
  
  const slides = [
    unit1,
    unit2
  ];
  
  const formData = ref({
    fullName: '',
    email: '',
    contactNumber: '',
    unitNumber: '1702',
    brokerName: '',
    brokerAgency: ''
  });
  
  const submitForm = () => {
    console.log('Form submitted:', formData.value);
    // Here you would typically send the data to your backend
    alert('Interest registered successfully!');
  };
  </script>
  
  <style scoped>
  .swiper {
    padding-bottom: 30px; /* Space for pagination */
  }

  .form {
  box-shadow: 0px 10px 60px 15px rgba(255, 255, 255, 0.6);
  width: 70vw;
}

@media (max-width: 768px) {
  .form {
    box-shadow: none;
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
  @media (max-width: 767px) {
    .swiper-container {
      height: 18rem !important;
    }
    
    .swiper-slide {
      height: 18rem !important;
    }
    
    .video-container {
      height: 18rem !important;
    }
    
    /* Show icons on mobile */
    .mobile-icon {
      display: block !important;
    }
  }

  .outer-swiper .swiper-pagination, .outer-mobile-swiper .swiper-pagination  {
    justify-content: start !important;
  }
  </style>