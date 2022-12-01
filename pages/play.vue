<template>
  <div>
    <div>
      <ConnectWallet v-if="!userWallet"/>
    </div>
    <!-- <button @click="startGame('dogs-for-better-lives')">Dogs for Better Lives Maze</button> -->
    <div v-for="(maze, index) in mazes" :key="`maze-${index}`">
      <button @click="startGame(maze)">
        <NuxtImg :src="maze.img" :alt="`${maze.name} Game Pass`" />
      </button>
    </div>
    <MoreOpensea />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
declare const window: any

interface Data {

}

interface Methods {
  setShowImages: any
  startGame: any
}

interface Components {
  ConnectWallet?: Object
  MoreOpensea?: Object
  isWalletConnected?: Boolean
}

interface Props {

}

interface Computed {
  isWalletConnected?: boolean
}

export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    ConnectWallet: () => import('@/components/ConnectWallet.vue'),
    MoreOpensea: () => import('@/components/mazes/MoreOpensea.vue')
  },
  data() {
    return {
      mazes: [
        {
          name: 'Dogs For Better Lives',
          slug: 'dogs-for-better-lives',
          img: '/mazes/mysterious_dogs_for_better_lives.png',
          openSeaCollection: 'dfbl-ai',
          niftyKitApi: process.env.NIFTY_DOG_AI_API_KEY
        }
      ],
      results: []
    }
  },
  computed: {
    ...mapGetters(['userWallet']),
    isWalletConnected() {
      return process.browser ? typeof window.ethereum !== 'undefined' : false
    }
  },
  methods: {
    setShowImages(images: string[]) {
      const randomized = images.sort(() => (Math.random() > .5) ? 1 : -1)
      return randomized.slice(0, 20)
    },
    startGame(maze: object | any) {
      const url = 'https://api.niftykit.com/drops/tokens'
      const config = {
        headers: {
          'x-api-key': maze.niftyKitApi
        } 
      }
      axios.get(url, config).then((response: any) => {
        const result = response.data.data
        const images = result.map((x: any) => { return x.data.image })
        this.setShowImages(images)
        this.$store.dispatch('maze/setMazeImages', this.setShowImages(images)).then(() => {
          this.$store.dispatch('maze/setPfpSource', 'http://localhost:3000/mazes/default_dog_pfp.png').then(() => {
            const slug = `/maze/${maze.slug}`
            this.$router.push(slug)
          })
        })     
      })
      
    }
  }
})
</script>