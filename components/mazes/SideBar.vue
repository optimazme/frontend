<template>
  <div class="h-full bg-gray-300">
    <div>
      <nuxt-img src="/logo_transparent.png" alt="Optimaz" class="w-48"/>
    </div>
    <div class="grid col-2">
      <div class="">
        <img :src="pfpSource" alt="pfp image for game" class="w-1/2 h-1/2"/>
      </div>
      <div class="">
        <CountDown :game-duration-in-minutes="5"/>
        {{foundImagesLength}} / {{showImagesLength}}
      </div>
      
    </div>
    <div class="h-96 w-full overflow-y-auto">
      <div v-for="(image, index) in foundImages" :key="`side-image-${index}`" class="w-60 flex flex-col md:flex-row">
        <NuxtImg class="w-20" :src="image.src" />
        <span>{{image.word}}</span>
      </div>
    </div>
    <button @click="endGame">End Game</button>
    <div v-if="foundPhrases">
      {{aiPhrase}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

interface Data {

}

interface Methods {

}

interface Components {
  CountDown: any
}

interface Props {

}

interface Computed {
  foundPhrases: string[]
}

export default Vue.extend<Data, Methods, Components, Props, Computed>({
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundImagesLength', 'foundPhrases','pfpSource', 'showImagesLength']),
    aiPhrase() {
      return this.foundPhrases.join(',')
    }
  },
  components: {
    CountDown: () => import('@/components/mazes/CountDown.vue')
  },
  methods: {
    endGame() {
      const foundPhrases = this.$store.getters['maze/foundImages'].map((x: any) => { return x.word })
      console.log({ foundPhrases })
      this.$store.dispatch('maze/setFoundPhrases', foundPhrases)
    }
  }
})
</script>