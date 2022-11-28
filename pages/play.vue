<template>
  <div>
    <div>
      <ConnectWallet />
    </div>
    <button @click="startGame('dogs-for-better-lives')">Dogs for Better Lives Maze</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
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
  methods: {
    startGame(route: string) {
      this.$store.dispatch('maze/setPfpSource', 'http://localhost:3000/mazes/default_dog_pfp.png').then(() => {
        this.$router.push(`/maze/${route}`)
      })
    }
  }
})
</script>