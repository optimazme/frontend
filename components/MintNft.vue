<template>
  <div>
    <slot name="mintImage" @click="mintNft">

    </slot>
    <slot name="mintButton">
      <button @click="mintNft">{{price}} {{currency}} Mint Now</button>
    </slot>
    <div v-if="error">{{error}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ethers } from 'ethers'
import axios from 'axios'
import backupMazeInfo from '@/utils/mazes/dogsForBetterLivesMaze'

declare const window: any

interface Data {
  error: any
}

interface Methods {
  setMazeInfo: any
  mintNft: any
  setGame?: any
  setShowImages?: any
}

interface Components {
  mintNft: any
}

interface Props {
  price: string | number | any
  contractAbi: Object[] | any
  contractAddress: string | any
  currency: string | any
  hasPlacesToBe: boolean
  goingTo: string
  mazeInfo: Object
  shouldSetupGame: boolean
}

export default Vue.extend<Data, Methods, Components, Props>({
  props: {
    price: {
      type: Number,
      default: 0.005
    },
    contractAbi: {
      type: Array,
      default: () => []
    },
    contractAddress: {
      type: String,
      default: ''
    },
     currency: {
      type: String,
      default: 'ETH'
    },
    hasPlacesToBe: {
      type: Boolean,
      default: false
    },
    goingTo: {
      type: String,
      default: '/'
    },
    mazeInfo: {
      type: Object,
      default: () => {}
    },
    shouldSetupGame: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: null
    }
  },
  methods: {
    setMazeInfo() {
      this.$store.dispatch('maze/setMazeInfo', this.mazeInfo)
    },
    async mintNft () {
      // resets the error
      this.error = null
      if(this.shouldSetupGame) {
        this.setMazeInfo()
        this.setGame()
      }
      
      // we should definitely use a library for this -.-;
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner()
      
      const contract = new ethers.Contract(
        this.contractAddress,
        this.contractAbi,
        signer
      );
      console.log({provider, signer, contract})
      try {
        console.log(`attempting to mint ${contract.name}`)
        const tx = await contract.mint(1)
        console.log(tx)
        if(this.hasPlacesToBe) {
          this.$router.push(this.goingTo)
        }
        } catch(err){
          this.error = err
          console.log(err)
          if(this.hasPlacesToBe) {
            this.$router.push(this.goingTo)
          }
        }
      },
    setGame() {
      const maze: any = Object.keys(this.mazeInfo).length > 0 ? this.mazeInfo : backupMazeInfo.data
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
      })
    },
    setShowImages(images: string[]) {
      const randomized = images.sort(() => (Math.random() > .5) ? 1 : -1)
      return randomized.slice(0, 20)
    }
    }
})
</script>