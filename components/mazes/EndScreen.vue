<template>
  <div>
    <h2 class="text-center text-6xl font-extrabold">Congratulations!</h2>
    <h3 class="text-center text-5xl">These are the words that you rescued!</h3>
    <div class="flex flex-row mx-2 sm:mx-10">
      <img :src="pfpSource" alt="your souvenir pfp" />
      <div class="flex-col">
         <div class="grid grid-cols-5">
          <div v-for="phrase in foundPhrases" :key="phrase" class="bg-gray-400 p-4 m-3 rounded-md h-16 justify-center">{{phrase}}</div>
        </div>
        <button class="bg-blue-700 text-white text-5xl justify-center text-center mx-12 w-3/4 rounded-md">Mint Now</button>
        <p class="italic w-3/4 sm:w-1/2 text-center mx-auto">These words will be sent to an AI art generator. You will receive the minted NFT in your wallet, and the results will have a chance to be shown in the maze during future gameplay!</p>
        <div class="mt-24 mx-auto w-3/4">
          <a href="https://opensea.io/collection/optimaz-test-drop" target="_" class="bg-blue-700 text-white text-2xl justify-center text-center p-3 rounded-md my-10">Buy your favorites on OpenSea</a>
           <div class="grid grid-cols-5 gap-1 mt-6">
            <div v-for="(image, index) in foundImages" :key="`image-${index}`" class="col-2">
              <span>
                <img :src="image.src" class="w-24 h-24"/>
              </span>
            </div>
          </div>
        </div>
       
      </div>  
    </div>
    <MoreOpenSea class="mx-2 sm:mx-10"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    MoreOpenSea: () => import("@/components/mazes/MoreOpensea.vue")
  },
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundPhrases', 'pfpSource'])
  },
  
})
</script>