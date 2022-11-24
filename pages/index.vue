<template>
    <div class="home w-screen h-screen bg-landing bg-center bg-cover before:bg-gray-800 before:blur-sm">
      <NavBar />
      <div class="body-container font-logo sm:pt-1 md:pt-24 lg:pt-28 flex justify-center flex-col w-screen">
        <p class="text-white text-2xl mx-auto text-center">Optimaz is under construction. 🏗️</p>
        <h1 class="text-9xl font-bold text-white text-center mx-auto">Coming <span class="text-gray-700">Soon</span>...</h1>
        <h2 class="text-white text-center mt-12">Please follow us on <a class="bg-white p-2 rounded-sm text-gray-700 hover:text-white hover:bg-gray-700" href="https://twitter.com/optimazme/">Twitter</a> for updates!</h2>
        <div class="launching-timer flex sm:px-24 md:px-44 py-5 text-white w-full flex-row">
         <div class="mx-auto">
           <p id="days" class="text-5xl">{{ days }}</p>
           <span>Days</span>
         </div>
         <div class="mx-auto">
           <p id="hours" class="text-5xl">{{ hours }}</p>
           <span>Hours</span>
         </div>
         <div class="mx-auto">
           <p id="minutes" class="text-5xl">{{ minutes }}</p>
           <span>Minutes</span>
         </div>
         <div class="mx-auto">
           <p id="seconds" class="text-5xl">{{ seconds }}</p>
           <span>Seconds</span>
         </div>
        </div>
      </div>
    </div>

</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  countdownEndDate: Date|any
  difference: number
  days: number
  hours: number,
  minutes: number,
  seconds: number
}

interface Methods {
  setCountdownDate: any
}

interface Components {
  AFrameWrapper: any
  SideBar: any
}

interface Props {

}
export default Vue.extend<Data, Methods, Components, Props>({
  data() {
    return {
      countdownEndDate: null,
      difference: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  mounted() {
    this.countdownEndDate = new Date("Dec 4, 2022 00:00:00").getTime();
    this.setCountdownDate()
  },
  methods: {
    setCountdownDate() {
      setInterval(() =>{
        const now = new Date().getTime();
        const difference = this.countdownEndDate - now;
        this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
      },1000);
    },
  }
})


// export default {
//   name: 'IndexPage',
// }
</script>

<style>
  /* .body-container {
    position: absolute;
    transform: translateX(20%);
  } */

  .body-container:before {
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
}
</style>