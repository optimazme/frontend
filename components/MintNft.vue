<template>
  <div @click="mintNft">
    <slot name="mintImage" @click="mintNft">

    </slot>
    <slot name="mintButton">
      <button>{{price}} {{currency}} Mint Now</button>
    </slot>
    <div v-if="error">{{error}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ethers } from 'ethers'
import axios from 'axios'
// import backupMazeInfo from '@/utils/mazes/dogsForBetterLivesMaze'

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
  mazeInfo: any
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
      let userWallet
      // we should definitely use a library for this -.-;
      try {
        userWallet = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      this.$store.dispatch('setUserWallet', userWallet[0])
      const signer = await provider.getSigner()
      
      const contract = new ethers.Contract(
        this.contractAddress,
        this.contractAbi,
        signer
      );
      
      const mintValue = ethers.utils.parseEther('0.005')
      try {
        console.log(`attempting to mint ${contract.name}`)
        const tx = await contract.mint(1, {value: mintValue})
        console.log(tx)
        this.$store.dispatch('maze/setGamePassNonce', tx.nonce)
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
      } catch (err) {
        this.error = err
      }
      },
    setGame() {
      
      
      
      
      
      let locations = [...new Set(this.mazeInfo.locations)]
      locations = locations.sort(() => (Math.random() > .5) ? 1 : -1)
      let subject = [...new Set(this.mazeInfo.subjects)]
      subject = subject.sort(() => (Math.random() > .5) ? 1 : -1)
      let prompt: any = [...new Set(this.mazeInfo.prompts)]
      prompt = prompt.sort(() => (Math.random() > .5) ? 1 : -1)
      const firstPrompt: string[] = prompt[0]
      const chosenPrompt = [...new Set(firstPrompt)].sort(() => (Math.random() > .5) ? 1 : -1)

      const url = 'https://x7ygc50t17.execute-api.us-west-1.amazonaws.com/staging/getAiArtMetadata'
      axios.get(url).then((response) => {
        const result = response.data
        console.log({result})
        console.log("---- mint real --- ")
        const images = [...new Set(result.map((x: any) => { return x.data.image }))]
        const showImages = this.setShowImages(images)
        const resultImages = showImages.map((image: string, index: number) => {
          return {
            src: image.replace('nftstorage.link','ipfs.io'),
            displayInfo: locations[index],
            word: chosenPrompt[index]
          }
        })
        this.$store.dispatch('maze/setShowImages', resultImages)
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