<template>
  <div @click="mintNft">
    <slot name="mintButton">
      <button :class="btnClass">{{price}} {{currency}} Mint Now</button>
    </slot>
    <div v-if="error">{{error}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ethers } from 'ethers'
import axios from 'axios'
import { mapGetters } from 'vuex'
// import backupMazeInfo from '@/utils/mazes/dogsForBetterLivesMaze'

declare const window: any

interface Data {
  error: any
}

interface Methods {
  mintNft: any
  createAiImage: any
  updateGameTokenMetadata: any
  updateAiTokenMetadata: any
}

interface Components {
  gamePassNonce?: any
}

interface Props {
  price: string | number | any
  contractAbi: Object[] | any
  contractAddress: string | any
  currency: string | any
  btnClass: string
  prompt: string
}

export default Vue.extend<Data, Methods, Components, Props>({
  props: {
    price: {
      type: Number,
      default: 0.001
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
    btnClass: {
      type: String,
      default: 'bg-blue-700 text-white text-5xl justify-center text-center mx-12 w-3/4 rounded-md'
    },
    prompt: {
      type: String,
      default: 'Border Collie, vibrant colors, portrait, great composition,in a forest, jean giraud'
    }
  },
  data() {
    return {
      error: null
    }
  },
  computed: {
    ...mapGetters('maze', ['gamePassNonce'])
  },
  methods: {
    async mintNft () {
      // resets the error
      this.error = null

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
      console.log({contract, contractAddress: this.contractAddress, ABI: this.contractAbi})
      const mintValue = ethers.utils.parseEther('0.001')
      try {
        console.log(`attempting to mint ${contract.name}`)
        const tx = await contract.mint(1, {value: mintValue})
        console.log(tx)
   
        const aiArt = await this.createAiImage(this.prompt)
        this.updateAiTokenMetadata(tx.nonce, aiArt.data.IpfsHash)
        if (this.gamePassNonce) {
          this.updateGameTokenMetadata(this.gamePassNonce, this.prompt)
        }
        
        } catch(err){
          this.error = err
          console.log(err)
        }
      } catch (err) {
        this.error = err
      }
    },
    async createAiImage(prompt: string) {
      // 
      const url = 'https://x7ygc50t17.execute-api.us-west-1.amazonaws.com/staging/getAiImage'
      const aiArtResponse = await axios.post(url, { prompt })
      return aiArtResponse
    },
    async updateGameTokenMetadata(nonce: string, prompt: string) {
      const url = 'https://x7ygc50t17.execute-api.us-west-1.amazonaws.com/staging/updateGameTokenMetadata'
      const tokenId = (parseInt(nonce) - 1).toString()
      await axios.post(url, {tokenId, prompt})
    },
    async updateAiTokenMetadata(nonce, image) {
      console.log({ nonce, image })
      const url = 'https://x7ygc50t17.execute-api.us-west-1.amazonaws.com/staging/updateAiTokenMetadata'
      const tokenId = (parseInt(nonce) - 1).toString()
      const prompt = `https://gateway.pinata.cloud/ipfs${image}`
      await axios.post(url, { 
          tokenId,
          prompt
       })
    }

  }
})
</script>