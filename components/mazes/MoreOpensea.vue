<template>
  <div>
    <h2>More from Optimaz</h2>
    <div class="grid grid-cols-3">
      <div v-for="(listing, index) in listings" :key="`listing-${index}`">
      <img :src="listing.maker_asset_bundle.assets[0].image_url" :alt="listing.maker_asset_bundle.assets[0].name" />
      <div>
        <div>{{formatPrice(listing.current_price)}} ETH</div>
        <button @click="buyNft(listing)">Buy Now</button>
      </div>        
    </div>
    </div>
    <!-- <h2>Asset</h2>
    <div v-if="assets">
      <!-- tokenId: {{assets[0].token_id}} -->
    <!-- </div>
    <pre>{{assets[0]}}</pre> -->
    <h2>listing</h2>
    <div v-if="listings">
      <!-- <pre>{{listings[0].protocol_data.parameters.offer[0].identifierOrCriteria}}</pre> -->
      <pre>{{listings[0]}}</pre>
    </div>
    
    <!-- <div v-for="(listing, index) in listings" :key="`listing-${index}`">
      <pre>{{listing.protocol_data}}</pre>
    </div> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Web3 from 'web3'
import { ethers } from 'ethers'
declare const window: any

interface Data {
  assets: Object[],
  listings: Object[]
}

interface Methods {

}

interface Components {
  openSeaApiKey?: string | any
}

interface Props {

}


export default Vue.extend<Data, Methods, Components, Props>({
  components: {
    
  },
  data() {
    return {
      assets: [],
      listings: []
    }
  },
  computed: {
    ...mapGetters(['openSeaApiKey'])
  },
  mounted() {
    const url = 'https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&collection=optimaz-dbl&include_orders=false'
    const config = {
      headers: {
        'x-api-key': this.openSeaApiKey,
        'accept': 'application/json'
      }
    }

    axios.get(url, config).then((response: any) => {
      const assets = response.data.assets
      this.assets = assets
      const tokenIds = assets.map((x: any) => {return `&token_ids=${x.token_id}`}).join('')
      const listingUrl = `https://api.opensea.io/v2/orders/ethereum/seaport/listings?asset_contract_address=0x495f947276749ce646f68ac8c248420045cb7b5e${tokenIds}&order_by=created_date&order_direction=desc`
      axios.get(listingUrl, config).then((response: any) => {
        const listings = response.data.orders
        // listings.forEach((listing:any, index: number) => {
        //   const tokenId = listing.protocol_data.parameters.offer[0].identifierOrCriteria
        //   const asset = assets.find((asset: any) => asset.token_id === tokenId)
        //   listings[index].imgUrl = asset.image_url
        //   listings[index].name = asset.name
        // });
        // console.log({listings})

        this.listings = listings
      })
    })
  },
  methods: {
    async buyNft(listing: Object) {
      console.log({ listing })
      if (process.browser && typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.requestAccounts()
        const account = accounts[0]
        console.log({ account })
        // web3.eth.signTransaction(listing, account)
        web3.eth.sign(listing.toString(), account)

      // const provider = new ethers.providers.Web3Provider(window.ethereum)
      // const signer = provider.getSigner()
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
      // try {
      //   const transactionResponse = await contract.fund({
      //     value: ethers.utils.parseEther(ethAmount),
      //   })
      //   await listenForTransactionMine(transactionResponse, provider)
      // } catch (error) {
      //   contractState.innerHTML = `There was an error: ${error}`
      //   console.log(error)
      // }
    } else {
      console.log('install metamask')
      // fundButton.innerHTML = "Please install MetaMask"
    }
    },
    formatPrice(currentPrice: string): number {
      const price = parseInt(currentPrice)
      return price / 10e18
    }
  }
})
</script>