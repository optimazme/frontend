<template>
  <div>
    <button @click="setGame">PLAY GAME</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import MazeInfo from '@/utils/mazes/dogsForBetterLivesMaze'

export default Vue.extend({
  data() {
    return {
      maze: {}
    }
  },
  methods: {
    setGame() {
      const maze = MazeInfo.data
      this.maze = maze
      const url = 'https://api.niftykit.com/drops/tokens'
      const config = {
        headers: {
          'x-api-key': maze.aiNiftyKitApi
        } 
      }

      const locations = maze.locations.sort(() => (Math.random() > .5) ? 1 : -1)
      // const images = this.mazeImages.sort(() => (Math.random() > .5) ? 1 : -1)
      const subject = maze.subjects.sort(() => (Math.random() > .5) ? 1 : -1)
      const prompt = maze.prompts.sort(() => (Math.random() > .5) ? 1 : -1)
      const chosenPrompt = prompt[0].sort(() => (Math.random() > .5) ? 1 : -1)
      axios.get(url, config).then((response) => {
        const result = response.data.data
        const images = result.map((x: any) => { return x.data.image })
        const showImages = this.setShowImages(images)
        const shownImages = showImages.map((image: string, index: number) => {
          return {
            src: image.replace('nftstorage.link','ipfs.io'),
            displayInfo: locations[index],
            word: chosenPrompt[index]
          }
        })
        this.$store.dispatch('maze/setShowImages', shownImages)
        this.$store.dispatch('maze/setSubject', subject[0])
        this.$store.dispatch('maze/startGame')
        this.$router.push('/maze/dogs-for-better-lives')
      })
    },
    setShowImages(images: string[]) {
      const randomized = images.sort(() => (Math.random() > .5) ? 1 : -1)
      return randomized.slice(0, 20)
    }
  }
})
</script>