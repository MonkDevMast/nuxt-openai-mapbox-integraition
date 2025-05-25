<script setup lang="ts">
useHead({
  title: "Rechitta - Text Page",
  meta: [
    {
      name: "description",
      content:
        "Discover, explore, and seal deals on premium properties with ease. Your next home or investment is just a click away.",
    },
  ],
});
</script>

<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center text-white"
  >
    <div class="w-full flex mx-auto justify-center items-center mb-5 sm:mb-7">
      <img
        src="/assets/images/rechitta-text.svg"
        class="img-fluid rounded-top h-4 sm:h-5 [@media(min-width:1600px)]:h-7"
        alt=""
      />
    </div>
    <div>
      <div
        class="text-[#C6C6C6] text-center font-normal sm:font-normal text-[34px] sm:text-[2.5rem] xl:text-[3.3rem] leading-[1.3] [@media(min-width:1600px)]:text-[4.5rem] [@media(min-width:1600px)]:px-0 font-['DM_Sans'] sm:px-24 px-1 container"
      >
        Here are some options, btw I'm right on your bottom left of the screen,
        you can ask me things <br />
        like: show me the map, show me overview of the property
      </div>
    </div>
  </div>
</template>
