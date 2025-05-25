<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter(); 

const showFooterContent = ref(false); 
const showChild = ref(true);
const transitionTimeout = ref<number | null>(null);

onMounted(() => {
  setTimeout(() => {
    showFooterContent.value = true;
  }, 50);
});

 
const handleTransitionEnd = () => {
  transitionTimeout.value = window.setTimeout(() => {
    router.push('/');
  }, 200);
};
 

onBeforeUnmount(() => {
  if (transitionTimeout.value) {
    clearTimeout(transitionTimeout.value);
  }
});
</script>

<template>
  <div class="relative h-full w-[100vw] overflow-hidden main-container">
   
    <div class="relative z-10 w-full h-full overflow-hidden">
     
      <div class="h-full py-3 mb-4 flex overflow-y-scroll scrollbar-hide">
        <transition name="fade" @after-leave="handleTransitionEnd">
          <div v-if="showChild" class="h-full w-full">
            <slot />
          </div>
        </transition>
      </div>

    
   
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background-size: cover;
}

.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.slide-up-enter-active {
  transition: all 0.6s ease-out;
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.footer-box {
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 250px 0px rgba(167, 167, 167, 0.3),
    0px 0px 178.996px 0px rgba(167, 167, 167, 0.3),
    0px 0px 104.415px 0px rgba(167, 167, 167, 0.3),
    0px 0px 52.207px 0px rgba(167, 167, 167, 0.3),
    0px 0px 14.916px 0px rgba(167, 167, 167, 0.3),
    0px 0px 7.458px 0px rgba(167, 167, 167, 0.3);
}
</style>