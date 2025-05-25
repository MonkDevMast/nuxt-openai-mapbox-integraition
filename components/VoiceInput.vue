<script setup lang="ts">
import MicButton from './MicButton.vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  isTransitioning?: boolean;
  multi?: boolean;
  micText: string;
  isActive: boolean;
  message?: string; 
}>();

const isTransitioning = props.isTransitioning ?? false;
const displayedMessage = ref('');
const isTyping = ref(false);
const showInput = ref(true);

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

const toggleMic = () => {
  emit('toggle');
};

watch(() => props.message, (newMsg) => {
  if (newMsg) {
    setTimeout(() => {
      showInput.value = false;
      isTyping.value = true;
      displayedMessage.value = '';

      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < newMsg.length) {
          displayedMessage.value += newMsg.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
          isTyping.value = false;
        }
      }, 30);
    }, 3000); 
  } else {
    displayedMessage.value = '';
    isTyping.value = false;
  }
}, { immediate: true });

const handleTextClick = () => {
  if (props.message && !isTyping.value) {
    showInput.value = true; // Show the input field
  }
};
</script>

<template>
  <div class="relative w-full">
    <div
      class="flex gap-4 sm:gap-4 mx-3 sm:mx-0 mb-3 sm:mb-0 z-50 transition-all duration-1000 ease-in-out"
      :class="{ 'translate-y-20 opacity-0': isTransitioning, 'items-end relative bottom-0': !showInput }"
    >
      <div
        @click="handleTextClick"
        class="flex items-end bg-[rgba(2,8,23,0.7)] backdrop-blur-sm px-5 sm:px-2  py-4 sm:py-4.5 min-w-[17.5rem] max-w-[20rem] sm:mb-7 transition-all duration-300 cursor-pointer"
        :class="{
          'rounded-full': showInput,
          'rounded-xl': !showInput
        }"
      >
        <input
          v-if="showInput"
          type="text"
          readonly
          :value="micText"
          class="bg-transparent text-white px-2 font-['DM Sans'] text-[16px] font-medium tracking-[-0.32px] focus:outline-none cursor-pointer w-full"
        />
        
        <p
          v-else-if="!showInput"
          class="text-white text-start font-['DM Sans'] text-[14px] font-light tracking-[-0.32px] cursor-pointer w-full max-h-[120px] overflow-y-auto 
          px-5 sm:px-3
           [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
          "
        >
          {{ displayedMessage }}
          <span v-if="isTyping" class="typing-cursor">|</span>
        </p>
      </div>

      <MicButton 
        :is-active="isActive" 
        @toggle="toggleMic" 
        :multiple-option="!!multi" 
        class="flex-shrink-0"
        :class="{'relative bottom-0 md:bottom-8': !showInput}"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-\[rgba\(2\,8\,23\,0\.7\)\] {
  background-color: rgba(2, 8, 23, 0.7);
}

/* Typing cursor animation */
.typing-cursor {
  animation: blink 1s step-end infinite;
  opacity: 1;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

div {
  transition: border-radius 0.3s ease;
}

.custom-scrollbar {
  scrollbar-width: thin; 
  scrollbar-color: transparent transparent; 
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px; 
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; 
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5); 
  border-radius: 10px; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8); 
}
</style>