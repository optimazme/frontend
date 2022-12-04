<template>
  <div class="home-star w-screen h-screen">
    <div class="text-white p-10 font">
      <div class="m-10">
        <h2 class="text-center text-6xl game_fonts font-extrabold">Congratulations!</h2>
        <h3 class="text-center text-5xl">These are the words that you rescued!</h3>
      </div>
      <div class="flex flex-row w-full">
        <div class="flex-col w-1/2">
          <div class="grid grid-cols-2 card m-10">
            <div v-for="phrase in foundPhrases" :key="phrase" class="bg-red-500 text-2xl m-4 p-3 rounded-md w-full justify-center">{{phrase}}</div>
          </div>
          <div class="flex justify-center">
            <button class="bg-blue-700 text-white text-5xl justify-center text-center w-1/2 p-4 rounded-md flex-down">Mint Now</button>
          </div>
          <div class="grid grid-cols-2 gap-1">
            <div v-for="(image, index) in foundImages" :key="`image-${index}`" class="col-2">
              <span>
                <img :src="image.src" class="w-10 h-10"/>
              </span>
              <button class="bg-blue-700 text-white text-2xl justify-center text-center p-3 rounded-md">BUY NOW</button>
            </div>
          </div>
        </div>
        <img src="../../static/mazes/mysterious_dogs_for_better_lives.png" alt="your souvenir pfp" class="pl-5"/> 
      </div> 
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('maze', ['foundImages', 'foundPhrases', 'pfpSource'])
  }
})
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Zen+Dots&display=swap');

  .logo {
    font-family: 'Poppins', sans-serif;
  }
  .font{
    font-family: 'Roboto', sans-serif;
  }
  .game_fonts{
    font-family: 'Zen Dots', cursive;
  }

  .card {
    height: auto;
    border-radius: 1rem;
    background: rgba(0,0,0,0.33);
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(0px);
  }

  .glass{
    background: rgba(0,0,0,0.33);
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(0px);
  }

  .new-glass{
    background: rgba(0, 0, 0, 0.85);
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(0px);
  }

  .home-star {
    background-image: url(../../static/bg_star.png);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
</style>