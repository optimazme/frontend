<template>
  <a-scene 
    id="maze"
    :style="`height: ${canvasHeight}px; width: ${canvasWidth}px`"
    environment="preset: default; groundYScale: 0.3; groundColor: #fff;"
    cursor="rayOrigin: mouse; fuse: false"
    raycaster="objects: .raycastable" embedded
  >
    <!-- ASSETS -->
      <a-assets>
        <img id="floor" :src="mazeFloor">
        <a-asset-item id="maze-glb" :src="mazeObj"></a-asset-item>
        <a-entity v-for="(image, index) in showImages" :key="`image-${index}}`">
          <a-asset-item :id="`vr-image-${index}`" :src="image.src"></a-asset-item>
        </a-entity>
       
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
      <a-gltf-model position="0 0 0" scale=".95 1 .95" rotation="0 90 0" src="#maze-glb"></a-gltf-model>
    <!-- END MAZE -->
    <!-- FLOOR -->
      <a-box v-for="position in floorPositions(-100, 100, 25)" :key="position"
        src="#floor"
        :position="position"
        scale="25 0.15 25"
       />
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
  'a-gltf-model',
  'a-box',
  'a-scene'
]

interface Data {
  mazeObj: string
}

interface Methods {

}

interface Components {
  showImagesLength?: number | any
  foundImagesLength?: number | any
  cameraPositionValue?: string | any
  baseUrl?: any
}

interface Props {
  canvasWidth: number
  canvasHeight: number
}

export default Vue.extend<Data, Methods, Components, Props>({
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
  data() {
    return {
      mazeObj: `https://www.optimaz.me/mazes/demo.glb`
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
    ...mapGetters('maze', ['cameraXPosition', 'cameraYPosition', 'cameraZPosition', 'foundImages', 'foundImagesLength', 'mazeFloor', 'pfpSource', 'showImages', 'showImagesLength']),
    cameraPositionValue() {
      // return `${this.cameraXPosition} ${this.cameraYPosition} ${this.cameraZPosition}`
      return "0 0 0"
    }
  },
  methods: {
    foundImage(image: any) {
      
      const foundImages = this.$store.getters['maze/foundImages'].map((image:any) => image.src)
      if (!foundImages.includes(image.src)) {
          this.$store.dispatch('maze/setFoundImage', image).then(() => {
            if (this.showImagesLength > 0 && this.foundImagesLength === this.showImagesLength) {
              this.$store.dispatch('maze/endGame')
            }
          })
      } else {
        const message = image.displayInfo.position ? `Found image! ${image.displayInfo.position}` : 'no image found'
        console.log(message)
      }
    },
    getDefaultAnimation() {

    },
    isUnfound(image: any) {
      const foundImages = this.$store.getters['maze/foundImages'].map((image:any) => image.src)
      return !foundImages.includes(image.src)
    },
    floorPositions(min: number, max: number, increment: number) {
      const positions = []
      for(let i = min; i <= max; i = i + increment) {
        for (let j = min; j <= max; j = j + increment) {
          positions.push(`${i} 0.25 ${j}`)
        }
      }
      return positions
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