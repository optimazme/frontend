<template>
  <div>
    <h2>Congratulations!</h2>
    <h3>These are the words that you rescued!</h3>
    <div class="flex flex-row">
      <img :src="pfpSource" alt="your souvenir pfp" />
      <div>
        <div class="flex flex-row">
          <div v-for="phrase in foundPhrases" :key="phrase" class="bg-gray-400 p-4 m-3 rounded-md h-16 justify-center">{{phrase}}</div>
        </div>
        <button class="bg-blue-700 text-white text-5xl justify-center text-center mx-12 w-3/4 rounded-md">Mint Now</button>
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('maze', ['foundPhrases', 'pfpSource'])
  }
})
</script>