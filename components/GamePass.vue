<template>
  <div class="flex justify-center pt-4">
    <button
      class="p-6 text-white bg-primary-dark rounded-lg shadow-lg hover:bg-primary text-base sm:text-3xl font-extrabold w-3/4 sm:w-1/2 mx-auto text-center"
      @click="buyToken"
    >
      Buy Pass (coming soon)
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
declare const window: any
interface Data {}

interface Methods {
  buyToken: Object
}

interface Components {
  blockExplorerUrl?: string | any
  chainId?: number | any
  chainName?: string | any
  contractAddress?: string | any
  currencySymbol?: string | any
  nativeSymbol?: string | any
  networkName?: string | any
  rpcUrl?: string | any
  symbolName?: string | any
}

export default Vue.extend<Data, Methods, Components>({
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['blockExplorerUrl', 'chainId', 'chainName', 'contractAddress', 'currencySymbol', 'nativeSymbol',  'networkName', 'rpcUrl', 'symbolName'])
  },
  methods: {
    async buyToken() {
      const chainId: string = this.chainId
      const chainName: string = this.networkName
      const contractAddress: string = this.contractAddress
      const nativeSymbol: string = this.currencySymbol
      const symbolName: string = this.symbolName
      const blockExplorerUrl: string = this.blockExplorerUrl

      const rpcUrl: string = this.$store.getters.rpcUrl
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  blockExplorerUrls: [blockExplorerUrl],
                  chainId,
                  chainName,
                  rpcUrls: [rpcUrl],
                  nativeCurrency: {
                    name: 'Ether',
                    symbol: nativeSymbol,
                    decimals: 18
                  }
                }
              ]
            })
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
      window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: contractAddress,
              symbol: symbolName,
              decimals: 18,
              image: 'https://www.mutationstation.io/fishbone_logo.png'
            }
          }
        })
        .then((success: any) => {
          if (success) {
            console.log('FOO successfully added to wallet!')
            this.$store.dispatch('buyToken')
          } else {
            throw new Error('Something went wrong.')
          }
        })
        .catch(console.error)
      // actually prompt to buy token
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: this.$store.getters.userWallet,
              to: this.$store.getters.contractAddress, // '0xeb3FC9C6C1f46F8F48e2d3be929978523C11A494', // contract 
              value: '0xde0b6b3a7640000', // 1 avax should be dynamic in the future
            },
          ],
        })
        .then((txHash: any) => console.log(txHash))
        .catch((error: any) => console.log(error));
    }
  }
})
</script>
