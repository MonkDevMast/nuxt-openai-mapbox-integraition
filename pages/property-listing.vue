<template>
  <div class="property-listing">
    <div class="swiper-pagination" id="swiper-pagination"></div>
    <div class="swiper-pagination" id="swiper-pagination2"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.swiper = new Swiper('.swiper', {
      pagination: {
        el: '#swiper-pagination',
        clickable: true,
      },
    });

    this.swiper2 = new Swiper('.swiper2', {
      pagination: {
        el: '#swiper-pagination2',
        clickable: true,
      },
    });
  }
}
</script> 