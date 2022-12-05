<template>
  <div class="home-star">
    <h2 class="text-4xl w-screen text-center p-5 my-5 bg-green-800 text-white">More from Optimaz</h2>
    
    <div class="grid grid-cols-3">
      <div v-for="(asset, index) in assets" :key="`asset-${index}`">
        <img :src="asset.image_url" :alt="asset.name" class="w-3/4 h-3/4 mx-auto mb-2"/>
        <div class="w-full text-center">
          <div  v-if="listings.length > 0"> 
            <div class="my-5">{{formatPrice(listings[index].current_price)}} ETH</div>
          </div>
          <a :href="asset.permalink" target="_" class="bg-blue-700 text-white text-2xl text-center p-3 rounded-md my-10">Buy on OpenSea</a>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mapGetters } from 'vuex'


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
        this.listings = response.data.orders
      })
    })
  },
  methods: {
    formatPrice(currentPrice: string): number {
      const price = parseInt(currentPrice)
      return price / 10e17
    }
  }
})
</script>
<style scoped>
.home-star {
    background-image: url(../../static/bg_star.png);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
</style>