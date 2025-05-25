<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import MainSection from '~/components/VoiceInput.vue';

const router = useRouter();
const route = useRoute();

const showFooterContent = ref(false);
const isActive = ref(false);
const micText = ref("Rachitta is Listening...");
const showChild = ref(true);
const transitionTimeout = ref<number | null>(null);

onMounted(() => {
  setTimeout(() => {
    showFooterContent.value = true;
  }, 50);
});

const navigateHome = () => {
  showChild.value = false;
};

const handleTransitionEnd = () => {
  transitionTimeout.value = window.setTimeout(() => {
    router.push('/');
  }, 200);
};

const toggleMic = () => {
  if (isActive.value) {
    isActive.value = false;
  } else {
    isActive.value = true;
    if (route.name === "intrection") {
      setTimeout(() => {
        router.push('/property-list');
      }, 2000);
    }
  }
};

onBeforeUnmount(() => {
  if (transitionTimeout.value) {
    clearTimeout(transitionTimeout.value);
  }
});
</script>

<template>
  <div class="relative h-full w-[100vw] overflow-hidden main-container">
    <img src="../assets/images//layout-bg.png" class="absolute top-0 left-0 w-full h-full object-cover"/>

    <div class="relative z-10 w-full h-full overflow-hidden">
      <!-- Top Logos -->
      <div
        class="absolute z-50 top-0 left-0 w-full flex justify-between items-center pt-5 sm:pt-7 pb-5 sm:pb-7 px-5 sm:px-9 lg:h-[15vh] h-[10%] backdrop-blur-md sm:backdrop-blur-none bg-black/30 sm:bg-transparent"
      >
        <img
          src="/assets/images/richitta-logo.svg"
          alt="Rechitta Logo"
          class="h-3 sm:h-5 cursor-pointer"
          @click="navigateHome"
        />
        <img
          src="/assets/images/anax-logo.svg"
          alt="Anax Logo"
          class="h-[40px] sm:h-[60px] cursor-pointer"
          @click="navigateHome"
        />
      </div>

      <!-- Cards Section with Transition -->
      <div class="h-full py-3 mb-4 flex overflow-y-scroll scrollbar-hide">
        <transition name="fade" @after-leave="handleTransitionEnd">
          <div v-if="showChild" class="h-full w-full">
            <slot />
          </div>
        </transition>
      </div>

      <!-- Desktop Footer -->
      <div
        class="absolute bottom-0 left-0 w-full justify-between items-center px-9 item-center pb-6 pt-5 h-[13%] text-white hidden md:flex"
      >
        <div   @click="navigateHome" class="flex items-center gap-3">
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
          <div v-if="showFooterContent" class="absolute right-5 bottom-2">
            <MainSection 
              :mic-text="micText"
              :multi="true"
              :is-active="isActive"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
 @toggle="toggleMic"
            />
          </div>
        </Transition>
      </div>

      <!-- Mobile Footer -->
      <div
        class="absolute bottom-0 left-0 w-full h-[15%] md:h-[20%] text-white flex md:hidden"
      >
        <Transition name="slide-up" appear>
          <div class="relative z-50 h-full w-full" v-if="showFooterContent">
            <div
              class="absolute left-[50%] top-[0] transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10 bg-black p-2"
            >
              <img
                src="/assets/images/chatbot.png"
                alt=""
                class="h-[60px] md:h-[80px] cursor-pointer"
              />
            </div>
            <div
              class="bg-black/80 backdrop-blur-lg footer-box h-full w-full justify-center flex items-center rounded-t-3xl pt-3"
            >
              <div class="flex gap-4 sm:gap-7 mb-3 sm:mb-0">
                <MainSection 
                  :mic-text="micText"
                  :multi="true"
                  :is-active="isActive"
                  @toggle="toggleMic"
                />
              </div>
            </div>
          </div>
        </Transition>
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