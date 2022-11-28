<template>
  <div>
    <h2 class="text-center text-6xl font-extrabold">Congratulations!</h2>
    <h3 class="text-center text-5xl">These are the words that you rescued!</h3>
    <div class="flex flex-row">
      <img :src="pfpSource" alt="your souvenir pfp" />
      <div class="w-screen">
        <div class="flex flex-row">
          <div v-for="phrase in foundPhrases" :key="phrase" class="bg-gray-400 p-4 m-3 rounded-md h-16 justify-center">{{phrase}}</div>
        </div>
        <button class="bg-blue-700 text-white text-5xl justify-center text-center mx-12 w-3/4 rounded-md">Mint Now</button>
      </div>
      
    </div>
    <div class="grid">
        <div v-for="(image, index) in foundImages" :key="`image-${index}`" class="col-2">
          <span>
            <img :src="image.src" class="w-10 h-10"/>
          </span>
          <button class="bg-blue-700 text-white text-2xl justify-center text-center p-3 rounded-md">BUY NOW</button>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundPhrases', 'pfpSource'])
  }
})
</script>