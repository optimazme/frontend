<template>
  <div>
    <div>
      <ConnectWallet />
    </div>
    <!-- <button @click="startGame('dogs-for-better-lives')">Dogs for Better Lives Maze</button> -->
    <div v-for="(maze, index) in mazes" :key="`maze-${index}`">
      <button @click="startGame(maze)">
        <NuxtImg :src="maze.img" :alt="`${maze.name} Game Pass`" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
// declare const window: any

interface Data {

}

interface Methods {

}

interface Components {
  ConnectWallet: Object
}

interface Props {

}

interface Computed {
  foundPhrases: string[]
}

export default Vue.extend<Data, Methods, Components, Props, Computed>({
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
          openSeaCollection: 'dfbl-ai'
        }
      ],
      results: []
    }
  },
  methods: {
    startGame(maze: object | any) {
      axios.get(`https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&collection=${maze.openSeaCollection}&include_orders=false`).then((response: any) => {
        console.log({response})
        // this.results = response.data.assets
        this.$store.dispatch('maze/setPfpSource', 'http://localhost:3000/mazes/default_dog_pfp.png').then(() => {
          // this.$router.push(`/maze/${maze.slug}`)
        })
      })
      
    }
  }
})
</script>