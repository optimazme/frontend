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
            <AiMintNft :contract-address="mazeInfo.aiContractAddress" :contract-abi="mazeInfo.contractAbi" :prompt="formattedPhrases" btn-class="bg-blue-700 text-white text-5xl justify-center text-center w-1/2 p-4 rounded-md flex-down"/>
          </div>
          <p class="italic w-3/4 sm:w-1/2 text-center mx-auto">These words will be sent to an AI art generator. You will receive the minted NFT in your wallet, and the results will have a chance to be shown in the maze during future gameplay!</p>
      
          <div class="mt-24 mx-auto w-3/4">
            <a href="https://opensea.io/collection/dogs-for-better-lives-ai-art" target="_" class="bg-blue-700 text-white text-2xl justify-center text-center p-3 rounded-md my-10">Buy your favorites on OpenSea</a>
            <div class="grid grid-cols-2 gap-1">
              <div v-for="(image, index) in foundImages" :key="`image-${index}`" class="col-2">
                <span>
                  <img :src="image.src" class="w-10 h-10"/>
                </span>
              </div>
            </div>
          </div>
        </div>
        <img :src="pfpSource" alt="your souvenir pfp is on its way!" class="w-1/4 h-1/4 pl-5"/>
      </div>
      <MoreOpenSea class="mx-2 sm:mx-10"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
declare const window: any

interface Data {
  pfpSource: string
}

interface Methods {
  getPfp: any
}

interface Components {
  formattedPhrases?: any
  foundPhrases?: any
  userWallet?: string | any
}

interface Props {

}

export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    MoreOpenSea: () => import("@/components/mazes/MoreOpensea.vue"),
    AiMintNft: () => import("@/components/AiMintNft.vue")
  },
  data() {
    return {
      pfpSource: ''
    }
  },
  computed: {
    ...mapGetters(['userWallet']),
    ...mapGetters('maze', ['foundImages', 'foundPhrases', 'mazeInfo']),
    formattedPhrases() {
      return this.foundPhrases.join(', ')
    }
  },
  mounted() {
    if (process.browser) {
        if(!this.userWallet || this.userWallet === undefined) {
          window.ethereum.request({
            method: 'eth_requestAccounts',
          }).then((wallet: string[]) => {
            this.getPfp(wallet[0])
          })
        } else {
            this.getPfp(this.userWallet)
        }
    }
    
  },
  methods: {
    async getPfp(walletAddress: string) {
      const url = `https://x7ygc50t17.execute-api.us-west-1.amazonaws.com/staging/getNftUrl/${walletAddress}`
      const cdnResponse = await axios.get(url)
      const ipfsResponse = await axios.get(cdnResponse.data)
      const ipfsUrl: string | any = ipfsResponse.data.image
      this.pfpSource = ipfsUrl
      
    }
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