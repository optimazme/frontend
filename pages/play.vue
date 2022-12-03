<template>
  <div>
    <div>
      <ConnectWallet v-if="!userWallet"/>
    </div>
    <!-- <button @click="startGame('dogs-for-better-lives')">Dogs for Better Lives Maze</button> -->
    <div v-if="hasGamePass">
      <div v-for="(maze, index) in mazes" :key="`maze-${index}`">
        <button @click="startGame(maze)">
          Play {{maze.name}} maze
        </button>
      </div>
    </div>
    <div v-else>
      <div v-for="(maze, index) in mazes" :key="`buy-pass-${index}`">
        <a href="https://app.niftykit.com/drops/optimaz-game-pass-dogs-for-better-lives" target="_">
          <NuxtImg src="/mazes/MysteryDogMint.png" alt="purchase a game pass"/>
        </a>
      </div>
    </div>
    
    <!-- <nk-dropkit apikey="sM0ZpGbsJs8eoQpCmoGR" /> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
// import { nkDropKit } from ''
declare const window: any

interface Data {

}

interface Methods {
  setShowImages: any
  startGame: any
}

interface Components {
  baseUrl?: string
  ConnectWallet?: Object
  MoreOpensea?: Object
  isWalletConnected?: Boolean
  hasGamePass?: boolean
}

interface Props {

}

interface Computed {
  isWalletConnected?: boolean
}

export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    ConnectWallet: () => import('@/components/ConnectWallet.vue')
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
    ...mapGetters(['baseUrl','userWallet']),
    isWalletConnected() {
      return process.browser ? typeof window.ethereum !== 'undefined' : false
    },
    hasGamePass() {
      return process.browser ? typeof window.ethereum !== 'undefined' : false
    }
  },
  methods: {
    setShowImages(images: string[]) {
      const randomized = images.sort(() => (Math.random() > .5) ? 1 : -1)
      return randomized.slice(0, 20)
    },
    startGame(maze: object | any) {
      const gamePass = `${this.baseUrl}/mazes/default_dog_pfp.png`
      
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
          this.$store.dispatch('maze/setPfpSource', gamePass).then(() => {
            this.$router.push(`/maze/${maze.slug}`)
          })
        })     
      })
      
    }
  }
})
</script>

<style> 
.web3modal-modal-lightbox { z-index: 999 !important; }
.web3modal-modal-container { z-index: 999 !important; }
.web3modal-modal-card { z-index: 999 !important; }
</style>