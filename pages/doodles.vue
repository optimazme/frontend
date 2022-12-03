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
import Web3 from 'web3'
declare const window: any
interface Data {
  gamePassABIJson: any
  gamePassContractAddress: any
  gamePassContract: any
  totalNftSupply: any
  web3: any
  price: any
  token: any
}

interface Methods {
  nftPrice?: any
  totalSupply?: any
  findToken?: any
  signNft?: any
}

interface Components {
  ConnectWallet?: Object
  isWalletConnected?: Boolean,
  gamePassABI?: any
  userWallet?: any
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
        gamePassContractAddress: '0xfa0a32DC5b43395752bEC3a955E16874E8a1e293',
        gamePassContract: null,
        totalNftSupply: null,
        web3: null,
        price: '',
        token: null,
        error: null
      }
    },
    computed: {
      ...mapGetters('seaDrop', ['gamePassABI']),
      ...mapGetters(['userWallet']),
    },
    mounted() {
      if (process.browser) {
          this.web3 = new Web3(window.ethereum)
          this.gamePassABIJson = JSON.parse(this.gamePassABI)
          this.gamePassContract = new this.web3.eth.Contract(this.gamePassABIJson, this.gamePassContractAddress)

          // console.log(this.gamePassContract.methods)

          const nftPrice = this.nftPrice()
          nftPrice.then((price: string) => {this.price = price})
          // const total = this.totalSupply()
          // total.then((total: string | number) => {this.totalNftSupply = total})
          // const token = this.findToken(0)
          // token.then((token: any) => {this.token = token})
      }
    },
    methods: {
      async nftPrice(): Promise<any> {
        if(this.gamePassContract) {
          const price = await this.gamePassContract.methods.price().call()
          console.log({price})
          return price
        } else {
          return ''
        }     
      },
      async totalSupply(): Promise<any> {
        if(this.gamePassContract) {
          const total = await this.gamePassContract.methods.totalSupply().call()
          console.log({total})
          return total
        }
        else {
          return 0
        }
      },
      async findToken(index: number) {
        if(this.gamePassContract) {
          const token = await this.gamePassContract.methods.tokenByIndex(index).call()
          console.log({token})
          return token
        }
        else {
          return null
        }
      },
      async signNft() {
        if (process.browser) {
          const accounts = await this.web3.eth.requestAccounts()
          const account = accounts[0]
          // make a transaction

          // sign a transaction
          const signPromise = this.web3.signTransaction()
          // this.web3.eth.sendTransaction({
          //   from: account,
          //   to: this.gamePassContractAddress,
          //   value: this.price,
          //   function(err: any, transactionHash: string | any) {
          //     if(!err) {
          //       console.log(transactionHash + 'success')
          //     } else {
          //       this.error = err
          //     }
          //   }
          // })
        }
        
        // this.web3.eth.sign('signing message', account)
      }
    },
})
</script>