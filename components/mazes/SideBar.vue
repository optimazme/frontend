<template>
  <div>
    <h1>Metamaze</h1>
    <div>
      {{foundImagesLength}} / {{showImagesLength}}
    </div>
    <div>
      <div v-for="(image, index) in foundImages" :key="`side-image-${index}`">
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