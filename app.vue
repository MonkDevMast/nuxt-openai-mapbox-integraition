<script setup lang="ts">
import mainlogo from "@/assets/images/main-logo.svg";
useHead({
  link: [{ rel: "icon", type: "image/png", href: mainlogo }],
});
</script>
<template>
  <div
    class="relative h-full w-[100vw] overflow-hidden bg-[#09060d] main-container"
  >
    <NuxtLayout>
      <Transition name="page" mode="out-in" appear>
        <div class="h-full w-full">
          <NuxtPage />
        </div>
      </Transition>
    </NuxtLayout>
  </div>
</template>
