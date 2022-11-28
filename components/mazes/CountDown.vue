<template>
  <div class="flex flex-row px-5 text-center">
    <div class="mx-auto">{{ minutesLeft }} minutes</div>
    <div class="mx-auto">{{ secondsLeft }} seconds</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

interface Data {
  gameEndTime: Date | any
  minutesLeft: number
  secondsLeft: number
}

interface Methods {
  getGameEndTime: any
}

interface Components {

}

interface Props {
  gameDurationInMinutes: number
}

interface Computed {
  
}

export default Vue.extend<Data, Methods, Components, Props, Computed>({
  props: {
    gameDurationInMinutes: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      gameEndTime: null,
      minutesLeft: 0,
      secondsLeft: 0
    }
  },
  mounted() {
    const origDate = new Date();
    this.gameEndTime = new Date(origDate.getTime() + this.gameDurationInMinutes*60000);
    this.$store.dispatch('maze/gameEndTime', this.gameEndTime)
    this.$store.dispatch('maze/startGame')

    const countDown = setInterval(() =>{
        const now = new Date().getTime();
        const difference = this.gameEndTime - now;
        // this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
        // this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        this.secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);
        this.$store.dispatch('maze/minutesLeft', this.minutesLeft)
        if (this.minutesLeft <= 0 && this.secondsLeft <= 0) {
          console.log('should end?????')
          this.$store.dispatch('maze/endGame')
          clearInterval(countDown) 
        }
      },1000);

  },
  methods: {
    getGameEndTime() {
      // const origDate = new Date();
      // this.gameEndTime = new Date(origDate.getTime() + this.gameDurationInMinutes*60000);
    }
  }

})

</script>
