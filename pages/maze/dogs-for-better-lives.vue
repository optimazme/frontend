<template>
  <div>
    <div v-if="!hasGameStarted && !mazeObj">
      Please wait while the game starts!
    </div>
    <div v-else-if="hasGameStarted && showGame" :key="`game-${hasGameEnded}`" class="h-screen flex flex-col-reverse sm:flex-row">
      <AFrameWrapper
        :canvas-width="windowWidth"
        :canvas-height="windowHeight"
      />
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
}

interface Methods {
  browserWidth: Number|any
  browserHeight: Number|any
}

interface Components {
  AFrameWrapper?: any
  baseUrl?: string | any
  EndScreen?: any
  gameReady?: any
  SideBar?: any
  hasGameEnded?: boolean | any
  mazeImages?: string[] | any
  showGame?: boolean | any
  showImagesLength?: number | any
  foundImagesLength?: number | any
  mazeInfo?: any
  maze?: any
  mazeObj: any
  pfpSource?: any
  shownImages?: any
}

interface Props {

}

export default Vue.extend<Data, Methods, Components, Props>({
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
      maze: {},
      shownImages: [],
      subject: ''
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
     ...mapGetters('maze', ['foundImagesLength', 'hasGameEnded', 'hasGameStarted', 'mazeImages', 'showImagesLength', 'mazeInfo', 'startGame']),
     gameReady() {
      return this.shownImages.length > 0 && this.pfpSource
     },
     showGame(): boolean {
      return !this.hasGameEnded
     },
     mazeObj() {
      return Object.keys(this.maze).length > 0 ? `${this.baseUrl}/${this.maze.mazeSlug}` : `${this.baseUrl}/mazes/demo.glb`
    },
    pfpSource() {
      return `${this.baseUrl}/mazes/default_dog_pfp.png`
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