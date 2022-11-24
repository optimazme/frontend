<template>
  <div>
    <h1>Metamaze</h1>
    <div>
      {{foundImagesLength}} / {{showImagesLength}}
    </div>
    <div class="h-60 w-full overflow-y-auto">
      <div v-for="(image, index) in foundImages" :key="`side-image-${index}`" class="w-40">
        <NuxtImg class="w-20" :src="image.src" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundImagesLength', 'showImagesLength'])
  }
})
</script>