<template>
  <div>
    <h2 class="text-center text-6xl font-extrabold">Congratulations!</h2>
    <h3 class="text-center text-5xl">These are the words that you rescued!</h3>
    <div class="flex flex-row">
      <img :src="pfpSource" alt="your souvenir pfp" />
      <div class="flex-col">
         <div class="grid grid-cols-5">
          <div v-for="phrase in foundPhrases" :key="phrase" class="bg-gray-400 p-4 m-3 rounded-md h-16 justify-center">{{phrase}}</div>
        </div>
        <button class="bg-blue-700 text-white text-5xl justify-center text-center mx-12 w-3/4 rounded-md" @click="mintImage">Mint Now</button>
        <div class="grid grid-cols-2 gap-1">
          <div v-for="(image, index) in foundImages" :key="`image-${index}`" class="col-2">
            <span>
              <img :src="image.src" class="w-10 h-10"/>
            </span>
            <button class="bg-blue-700 text-white text-2xl justify-center text-center p-3 rounded-md">BUY NOW</button>
          </div>
        </div>
      </div>
        
    </div> 
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default Vue.extend({
  computed: {
    ...mapGetters(['baseBackendUrl']),
    ...mapGetters('maze', ['foundImages', 'foundPhrases', 'pfpSource'])
  },
  methods: {
    mintImage() {
      const options = {

          prompt: this.foundPhrases.join(",")

      }
      console.log('got here')
      return axios
      .post(`${this.baseBackendUrl}/getAiImage`, options)
      .then((response) => {
        return response.data.body.uri
      })
      .catch((error) => {
        return error
      })
    }
  }
})
</script>