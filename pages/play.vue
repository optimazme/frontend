<template>
  <div>
    <!-- <button @click="startGame('dogs-for-better-lives')">Dogs for Better Lives Maze</button> -->
    <!--  -->
    <div v-for="(maze, index) in mazes" :key="`maze-${index}`">
       
      <MintNft
        :contract-address="maze.gamePassContractAddress"
        :contract-abi="maze.contractAbi"
        :price="maze.price"
        :currency="maze.currency"
        :has-places-to-be="true"
        :going-to="`/maze/${maze.slug}`"
        :maze-info="maze.mazeInfo"
        :should-setup-game="true"
      >
        <template #mintImage><NuxtImg :src="maze.img" :alt="`${maze.name} Game Pass`" /></template>
      </MintNft>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

import dogsForBetterLivesInfo from '@/utils/mazes/dogsForBetterLivesMaze'
declare const window: any

interface Data {
  dbfl: any
  mazes?: any
}

interface Methods {
  setShowImages: any
  
 
}

interface Components {
  MintNft?: any
  
}

interface Props {

}

export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    MintNft: () => import("@/components/MintNft.vue")
  },
  data() {
    return {
      dbfl: dogsForBetterLivesInfo,
      results: [],
      mazes: [],
    }
  },
  computed: {
    
  },
  mounted() {
    this.mazes = [
        {
          name: this.dbfl.data.mazeName,
          slug: this.dbfl.data.slug,
          img: this.dbfl.data.buyImg,
          openSeaCollection: 'dfbl-ai',
          price: parseInt(this.dbfl.data.gamePassPrice) / 10e18,
          currency: this.dbfl.data.currency,
          niftyKitApi: process.env.NIFTY_DOG_AI_API_KEY,
          gamePassContractAddress: this.dbfl.data.gamePassContractAddress,
          aiContractAddress: this.dbfl.data.aiContractAddress,
          contractAbi: this.dbfl.data.contractAbi,
          mazeInfo: this.dbfl.data
        }
      ]
  },
})
</script>