<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

useHead({
  title: "Rechitta - Property Map",
  meta: [
    {
      name: "description",
      content:
        "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});

const route = useRoute();
const isLoading = ref(true);
const unitId = route.params.id;

onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>

<template>
  <div class="h-full w-full">
    <transition v-if="isLoading" name="fade">
      <div class="flex justify-center items-center h-full w-full">
      </div>
    </transition>
    <transition v-else name="fade">
      <div class="w-full h-full z-[9999] flex justify-center items-center">
        <div
          class="flex flex-col bg-black backdrop-blur-xl shadow-lg rounded-3xl px-5 py-5 max-w-[1200px] w-full min-h-[300px] h-[40%] sm:h-[75%] overflow-hidden map-box mx-3"
        >
          <div class="w-full h-full">
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

<style scoped>
.map-box {
  /* background: black;
  border: 2px solid #595959; */
  box-shadow: 0px 0px 150px 0px rgba(167, 167, 167, 0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>