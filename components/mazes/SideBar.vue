<template>
  <div class="h-screen home-star text-white w-1/6">
    <div class="mt-10 game_fonts m-4 text-4xl">
      Dogs <br />
      For <br />
      Better <br />
      Life <br />
    </div>
    <div class="flex flex-col m-4">
      <div class="">
        <img :src="pfpSource" alt="pfp image for game" class="w-1/2 h-1/2"/>
      </div>
      <div class="">
        <CountDown :game-duration-in-minutes="gameDurationInMinutes"/>
      </div>
      <div class="text-2xl font m-4 mb-0 flex justify-center items-center">
        {{foundImagesLength}} / {{showImagesLength}}
      </div>
    </div>
    <div v-for="(image, index) in foundImages" :key="`side-image-${index}`" class="h-96 w-full overflow-y-auto">
      <div class="m-4 snap-y">
        <img :src="image.src" class="w-max h-max"/>
        <span>{{image.word}}</span>
      </div>
    </div>
    <div class="flex overflow-hidden fixed bottom-0 w-1/6">
      <button class="bg-red-500 text-white w-full h-20 text-2xl" @click="endGame">End Game</button>
    </div>
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
  CountDown?: any
  aiPhrase?: any
  foundPhrases: string[]
}

interface Props {
  gameDurationInMinutes: number
}


export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    CountDown: () => import('@/components/mazes/CountDown.vue')
  },
  props: {
    gameDurationInMinutes: {
      type: Number,
      default: 5
    }
  },
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundImagesLength', 'foundPhrases','pfpSource', 'showImagesLength']),
    aiPhrase(): string {
      return this.foundPhrases.join(',')
    }
  },
  methods: {
    endGame() {
      const foundPhrases = this.$store.getters['maze/foundImages'].map((x: any) => { return x.word })
      
      this.$store.dispatch('maze/setFoundPhrases', foundPhrases)
    }
  }
})
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Zen+Dots&display=swap');

  .logo {
    font-family: 'Poppins', sans-serif;
  }
  .font{
    font-family: 'Roboto', sans-serif;
  }
  .game_fonts{
    font-family: 'Zen Dots', cursive;
  }

  .home-star {
    background-image: url(../../static/bg_star.png);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }


</style>