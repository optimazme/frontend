<template>
  <!-- <a-scene 
    id="maze"
    :style="`height: ${canvasHeight}px; width: ${canvasWidth}px`"
    environment="preset: default; groundYScale: 0.3; groundColor: #fff;"
    cursor="rayOrigin: mouse; fuse: false"
    raycaster="objects: .raycastable" embedded
  > -->
  <a-scene
      id="maze"
      cursor="rayOrigin: mouse; fuse: false"
      :style="`height: ${canvasHeight}px; width: ${canvasWidth}px`"
      raycaster="objects: .raycastable"
      embedded
    >
    <!-- ASSETS -->
      <a-assets>
        <img id="floor" src="http://localhost:3000/mazes/demo_floor.png">
        <a-asset-item id="maze" src="http://localhost:3000/mazes/demo.glb"></a-asset-item>
      </a-assets>
    <!-- END ASSETS -->
    <!-- CAMERA -->
    <a-entity id="rig" :position="cameraPositionValue">
      <a-entity
        camera
        look-controls
        wasd-controls="acceleration:30;"
        position="0 1.6 0"
      ></a-entity>
    </a-entity>
    <!-- END CAMERA -->
    <a-entity id="mouseCursor" cursor="rayOrigin: mouse"></a-entity>
    <!-- IMAGES -->
    <a-entity v-for="(image, index) in showImages" :key="`image-${index}-${foundImagesLength}`">
      <a-box
        v-if="isUnfound(image)" 
        :position="image.displayInfo.position"
        :src="image.src"
        :scale="image.displayInfo.scale"
        :rotation="image.displayInfo.rotation"
        @click="foundImage(image)"
      >
      </a-box>
    </a-entity>
    <!-- END IMAGES -->
    <!-- MAZE -->
      <a-entity gltf-model="#maze"></a-entity>
    <!-- END MAZE -->
    <!-- FLOOR -->
      <a-box src="#floor" position="0 0.5 0" scale="25 0.15 25"/>
    <!-- END FLOOR -->
  </a-scene>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.config.ignoredElements = [
  'a-asset-item',
  'a-assets',
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
    ...mapGetters('maze', ['cameraXPosition', 'cameraYPosition', 'cameraZPosition', 'foundImages', 'foundImagesLength', 'showImages']),
    cameraPositionValue() {
      // return `${this.cameraXPosition} ${this.cameraYPosition} ${this.cameraZPosition}`
      return "0 0 0"
    }
  },
  methods: {
    foundImage(image: any) {
      
      const foundImages = this.$store.getters['maze/foundImages'].map((image:any) => image.src)
      if (!foundImages.includes(image.src)) {
          this.$store.dispatch('maze/setFoundImage', image)
      } else {
        const message = image.displayInfo.position ? `Found image! ${image.displayInfo.position}` : 'no image found'
        console.log(message)
      }
    },
    isUnfound(image: any) {
      // console.log(this.$store.getters['maze/foundImages'])
      // return true
      const foundImages = this.$store.getters['maze/foundImages'].map((image:any) => image.src)
      return !foundImages.includes(image.src)
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