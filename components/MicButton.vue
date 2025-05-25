<template>
  <div class="relative">
    <!-- Icons section -->
    <div v-if="multipleOption && isActive" class="absolute bg-gray-800 mb-2 rounded-xl px-3 py-3 z-50 md:top-[-100px] top-[-20px] left-[-10rem] md:-left-[120px] transform -translate-x-1/2 flex space-x-4">
      <button @click="handleNavigation('/property-detail/videos/1701')" class="text-white cursor-pointer">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4v16l16-8L4 4z" stroke="white" stroke-width="2"/>
        </svg>
        <span class="text-xs">video</span>
      </button>
      <button @click="handleNavigation('/property-detail/images/1701')" class="text-white">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="14" x="2" y="5" stroke="white" stroke-width="2"/>
          <circle cx="8" cy="11" r="2" fill="white"/>
        </svg>
        <span class="text-xs">image</span>

      </button>
      <button @click="handleNavigation('/property-detail/map/1701')" class="text-white">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2h16v20H4z" stroke="white" stroke-width="2"/>
          <path d="M4 6h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" fill="white"/>
        </svg>
        <span class="text-xs">map</span>
      </button>
      <button @click="handleNavigation('/property-detail/3d-map/17011')" class="text-white">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2h16v20H4z" stroke="white" stroke-width="2"/>
          <path d="M4 6h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" fill="white"/>
        </svg>
        <span class="text-xs">3d map</span>
      </button>
      <button @click="handleNavigation('/comparison')" class="text-white">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2h16v20H4z" stroke="white" stroke-width="2"/>
          <path d="M4 6h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" fill="white"/>
        </svg>
        <span class="text-xs">Comparison</span>
      </button>
      <button @click="handleNavigation('/register')" class="text-white">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2h16v20H4z" stroke="white" stroke-width="2"/>
          <path d="M4 6h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" fill="white"/>
        </svg>
        <span class="text-xs">register</span>
      </button>
    </div>

    <!-- Microphone button -->
    <button
      @click="()=>{
        toggleMicrophone()
        emit('toggle')
      }"
      :class="[
        'w-14 h-14 flex items-center justify-center cursor-pointer rounded-full transition-colors duration-700 p-2 shadow-neon-glow',
        isActive ? 'bg-white' : 'bg-black',
      ]"
    >
      <svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="isActive ? 'text-black' : 'text-white'"
        class="transition-colors duration-700"
      >
        <rect
          x="12"
          y="5.5"
          width="8"
          height="14.6667"
          rx="4"
          :stroke="isActive ? '#000000' : '#FFFFFF'"
          stroke-width="2.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25.3332 16.166C25.3332 21.3207 21.1545 25.4993 15.9998 25.4993C10.8452 25.4993 6.6665 21.3207 6.6665 16.166"
          :stroke="isActive ? '#000000' : '#FFFFFF'"
          stroke-width="2.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 25.5V29.5"
          :stroke="isActive ? '#000000' : '#FFFFFF'"
          stroke-width="2.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const props = defineProps<{
  isActive: boolean;
  multipleOption?: boolean; 
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'navigate', page: string): void; 
}>();

const toggleMicrophone = () => {
  console.log('Microphone toggled:', !props.isActive);
};

const handleNavigation = (page: string) => {
  router.push(page)
};
</script>

<style scoped>
/* Add any custom styles here */
</style>