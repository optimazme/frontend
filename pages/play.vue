<template>
  <div>
    <button @click="startGame('dogs-for-better-lives')">Dogs for Better Lives Maze</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'


interface Data {

}

interface Methods {

}

interface Components {

}

interface Props {

}

interface Computed {
  foundPhrases: string[]
}

export default Vue.extend<Data, Methods, Components, Props, Computed>({
  methods: {
    startGame(route: string) {
      this.$store.dispatch('maze/setPfpSource', 'http://localhost:3000/mazes/default_dog_pfp.png').then(() => {
        this.$router.push(`/maze/${route}`)
      })
    }
  }
})
</script>