<template>
  <div>
    <div v-if="!hasMetamask" class="bg-red-500 text-white w-full h-20 mt-10 rounded-md text-2xl">
      <a target="_" href="https://metamask.io/">
        <span>Download</span> Metamask to connect wallet.
      </a>
    </div>
    <div v-else class="bg-red-500 text-white w-full h-20 mt-10 rounded-md text-2xl" @click="connectMetamask">
      <button>
        Connect Wallet!
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
declare const window: any
interface Data {
  
}

interface Methods {
  connectMetamask: Object
}

interface Components {

}

export default Vue.extend<Data, Methods, Components>({
  data() {
    return {
    }
  },
  computed: {
    hasMetamask(): boolean {
      return process.browser ? typeof window.ethereum !== 'undefined' : false
    },
     windowMeta (): string | any {
      
      return process.browser ? Object.keys(window) : []
    }
  },
  methods: {
    async connectMetamask() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      this.$store.dispatch('setUserWallet', account)
    }
  }
  
})
</script>