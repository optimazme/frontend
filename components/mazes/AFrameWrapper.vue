<template>
  <a-scene 
    id="maze"
    :style="`height: ${canvasHeight}px; width: ${canvasWidth}px`"
    environment="preset: default; groundYScale: 0.3; groundColor: #fff;"
    cursor="rayOrigin: mouse; fuse: false"
    raycaster="objects: .raycastable" embedded
  >
    <!-- CAMERA -->
    <a-entity id="rig" :position="cameraPositionValue">
      <a-entity
        camera
        look-controls
        wasd-controls="acceleration:30;"
      ></a-entity>
    </a-entity>
    <!-- END CAMERA -->
    <a-entity id="mouseCursor" cursor="rayOrigin: mouse"></a-entity>
    <!-- IMAGES -->
    <a-entity v-for="(image, index) in showImages" :key="`image-${index}`">
      <a-box
        v-if="isUnfound(image)" 
        :position="image.displayInfo.position"
        :src="image.src"
        :scale="image.displayInfo.scale"
        :rotation="image.displayInfo.rotation"
        @click="foundImage(image)">
      </a-box>
    </a-entity>
    <!-- END IMAGES -->
    <!-- MAZE -->
    <!-- END MAZE -->
  </a-scene>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.config.ignoredElements = [
  'a-entity',
  'a-box',
  'a-scene'
]
export default Vue.extend({
  props: {
    canvasWidth: {
      type: Number,
      default: 500
    },
    canvasHeight: {
      type: Number,
      default: 500
    }
  },
  computed: {
    ...mapGetters('maze', ['cameraXPosition', 'cameraYPosition', 'cameraZPosition', 'foundImages', 'showImages']),
    cameraPositionValue() {
      // return `${this.cameraXPosition} ${this.cameraYPosition} ${this.cameraZPosition}`
      return "0 0 0"
    }
  },
  methods: {
    foundImage(image: any) {
      
      const foundImages = this.$store.getters['maze/foundImages'].map((image:any) => image.src)
      console.log({ foundImages })
      if (!foundImages.includes(image.src)) {
        this.$store.dispatch('maze/setFoundImage', image)
      } else {
        const message = image.displayInfo.position ? `Found image! ${image.displayInfo.position}` : 'no image found'
        console.log(message)
      }
    },
    isUnfound(image: any) {
      console.log(this.$store.getters['maze/foundImages'])
      return true
      // const foundImages = this.$store.state.foundImages.map((image:any) => image.src)
      // return !foundImages.includes(image.src)
    }
  }
  
})
</script>
<style scoped>
  .a-frame-container {
    width: 1080px;
    height: 600px;
  }
</style>