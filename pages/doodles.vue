<template>
  <div>
    <h2>doodles</h2>
    <div>price {{price}}</div>
    <!-- <div>total NFTs {{ totalNftSupply }}</div>
    <div>token <pre>{{token}}</pre></div> -->
    <button @click="signNft">Sign</button>
    <!-- <MoreOpenSea /> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ethers } from 'ethers'
import Web3 from 'web3'

declare const window: any
interface Data {
  dogAiArtAddress: string
  gamePassABIJson: any
  gamePassContractAddress: any
  gamePassContract: any
  totalNftSupply: any
  web3: any
  price: any
  provider: any
  token: any
}

interface Methods {
  nftPrice?: any
  totalSupply?: any
  findToken?: any
  signNft?: any
  getSigner?: any
  getContract?: any
}

interface Components {
  ConnectWallet?: Object
  generativeAbi?: any
  isWalletConnected?: Boolean,
  gamePassABI?: any
  // moreOpensea?: any
  
}

interface Props {

}
export default Vue.extend<Data, Methods, Components, Props>({
    components: {
      // MoreOpenSea: () => import('@/components/mazes/MoreOpensea.vue')
    },
    data() {
      return {
        gamePassABIJson: null,
        gamePassContractAddress: '0x8b0FD871B60Def160dDcecc9864dBe96c2023242',
        dogAiArtAddress: '0xE693b5107B4Bf5222d72852f080a2cd54035E4C3',
        gamePassContract: null,
        totalNftSupply: null,
        web3: null,
        price: '',
        provider: null,
        token: null,
        error: null
      }
    },
    computed: {
      ...mapGetters('seaDrop', ['generativeAbi']),
    },
    mounted() {
      if (process.browser) {
          // this.web3 = new Web3(window.ethereum)
          // this.gamePassContract = new this.web3.eth.Contract(this.gamePassABIJson, this.gamePassContractAddress)
          // this.provider = new ethers.providers.Web3Provider(window.ethereum);

          // const nftPrice = this.nftPrice()
          // nftPrice.then((price: string) => {this.price = price})
      }
    },
    methods: {
      async nftPrice(): Promise<any> {
        if(this.gamePassContract) {
          const price = await this.gamePassContract.methods.price().call()
          
          return price
        } else {
          return ''
        }     
      },
      async getSigner() {
        const provider = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
        return provider ? await this.provider.getSigner() : null
      },

      async getContract() {
        const signer = await this.getSigner() 
        const contract = new ethers.Contract(
          this.gamePassContractAddress,
          this.gamePassABIJson,
          signer
        )
        return contract
      },
      async signNft() {
        if (process.browser) {
          // we should definitely use a library for this -.-;
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(
            this.dogAiArtAddress,
            this.generativeAbi,
            signer
          );
          try {
          console.log(`attempting to mint ${contract.name}`)
          const tx = await contract.mint(1)
          console.log(tx)
          } catch(err){
            console.log(err)
          }
          }
        }
    },
})
</script>