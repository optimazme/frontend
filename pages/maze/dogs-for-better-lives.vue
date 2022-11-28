<template>
  <div>
    <div v-if="showGame" :key="`game-${hasGameEnded}`" class="h-screen flex flex-col-reverse sm:flex-row">
      <AFrameWrapper :canvas-width="windowWidth" :canvas-height="windowHeight" />
      <SideBar />
    </div>
    <div v-else :class="showGame ? '' : 'bg-red'">
      <EndScreen />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import ImageInfo from '@/stubs/imagesStub'
import MazeInfo from'@/utils/mazes/dogsForBetterLivesMaze'

Vue.config.ignoredElements = [
  'a-assets',
  'a-asset-item',
  'a-box',
  'a-entity',
  'a-gltf-model',
  'a-scene',
]

interface Data {
  windowWidth: number
  windowHeight: number
  shownImages: Object[]
}

interface Methods {
  browserWidth: Number|any
  browserHeight: Number|any
}

interface Components {
  AFrameWrapper: any
  EndScreen: any
  SideBar: any
}

interface Props {

}

interface Computed {
  showGame: boolean | any
  hasGameEnded: boolean
}

export default Vue.extend<Data, Methods, Components, Props, Computed>({
  components: {
    AFrameWrapper: () => import('@/components/mazes/AFrameWrapper.vue'),
    EndScreen: () => import('@/components/mazes/EndScreen.vue'),
    SideBar: () => import('@/components/mazes/SideBar.vue')
  },
  layout: 'vr',
  data() {
    return {
      windowWidth: 500,
      windowHeight: 500,
      shownImages: []
    }
  },
  computed: {
     ...mapGetters('maze', ['foundImagesLength', 'hasGameEnded', 'showImagesLength']),
     showGame() {
      return !this.hasGameEnded
     }
  },
  mounted() {
    // making aframe reactive
    this.browserWidth()
    this.browserHeight()
    addEventListener('resize', () => {
      this.browserWidth()
      this.browserHeight()
    });

    
    const locations = MazeInfo.data.locations.sort(() => (Math.random() > .5) ? 1 : -1)
    const images = ImageInfo.data.images.sort(() => (Math.random() > .5) ? 1 : -1)
    const subject = MazeInfo.data.subjects.sort(() => (Math.random() > .5) ? 1 : -1)
    const prompt = MazeInfo.data.prompts.sort(() => (Math.random() > .5) ? 1 : -1)
    const chosenPrompt = prompt[0]

    const shownImages = images.map((image, index) => {
      return {
        src: image.src,
        displayInfo: locations[index],
        word: chosenPrompt[index]
      }
    })
    this.shownImages = shownImages
    this.$store.dispatch('maze/setShowImages', shownImages)
    this.$store.dispatch('maze/setSubject', subject[0])
    this.$store.dispatch('maze/setPrompt', chosenPrompt)
    this.$store.dispatch('maze/startGame')
  },
  methods: {
    browserWidth(): number|any {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (process.browser) {
        this.windowWidth = window.innerWidth < 600 ? window.innerWidth : window.innerWidth * 0.9
      } else {
        this.windowWidth =  500
      }
      
    },
    browserHeight(): number|any {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if( process.browser ) {
         this.windowHeight = window.innerWidth < 600 ? window.innerHeight * 0.9 : window.innerHeight
      } else {
        this.windowHeight = 500
      }
    }
  }
})
</script>