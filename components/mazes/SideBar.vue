<template>
  <div class="h-full">
    <h1>Metamaze</h1>
    <div>
      {{foundImagesLength}} / {{showImagesLength}}
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

}

interface Props {

}

interface Computed {
  foundPhrases: string[]
}

export default Vue.extend<Data, Methods, Components, Props, Computed>({
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundImagesLength', 'foundPhrases', 'showImagesLength']),
    aiPhrase() {
      return this.foundPhrases.join(',')
    }
    
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