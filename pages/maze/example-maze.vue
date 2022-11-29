<template>
  <div class="h-screen bg-green-700 flex flex-col-reverse sm:flex-row">
    <AFrameWrapper :canvas-width="windowWidth" :canvas-height="windowHeight" />
    <SideBar />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ImageInfo from '@/stubs/imagesStub'
import MazeInfo from'@/utils/mazes/exampleMaze'

Vue.config.ignoredElements = [
  'a-entity',
  'a-scene'
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
  SideBar: any
}

interface Props {

}

export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    AFrameWrapper: () => import('@/components/mazes/AFrameWrapper.vue'),
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
  // computed: {
  //   // positions() {
  //   //   const positions: string[] = []
  //   //   for (let i = -100; i < 100; i=i+5) {
  //   //     for (let j = -100; j < 100; j=j+5) {
  //   //       positions.push(`${i} 2 ${j}`)
  //   //     }
  //   //   }
  //   //   return positions
  //   // }
  // },
  mounted() {
    // making aframe reactive
    this.browserWidth()
    this.browserHeight()
    addEventListener('resize', () => {
      this.browserWidth()
      this.browserHeight()
    });

    // setting the images
    // .sort(() => (Math.random() > .5) ? 1 : -1);
    const locations = MazeInfo.data.locations.sort(() => (Math.random() > .5) ? 1 : -1)
    const images = ImageInfo.data.images.sort(() => (Math.random() > .5) ? 1 : -1)
    const shownImages = images.map((image, index) => {
      return {
        src: image.src,
        displayInfo: locations[index]
      }
    })
    this.shownImages = shownImages
    this.$store.dispatch('maze/setShowImages', shownImages)
  },
  methods: {
    browserWidth(): number|any {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (process.browser) {
        this.windowWidth = window.innerWidth < 600 ? window.innerWidth : window.innerWidth * 0.8
      } else {
        this.windowWidth =  500
      }
      
    },
    browserHeight(): number|any {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if( process.browser ) {
         this.windowHeight = window.innerWidth < 600 ? window.innerHeight * 0.8 : window.innerHeight
      } else {
        this.windowHeight = 500
      }
    }
  }
})
</script>