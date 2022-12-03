export const state = () => ({
  baseUrl: process.env.BASE_URL,
  baseBackendUrl: process.env.BASE_BACKEND_URL,
  blockExplorerUrl: process.env.BLOCK_EXPLORER_URL,
  chainId: process.env.CHAIN_ID,
  chainName: process.env.CHAIN_NAME,
  currencySymbol: process.env.CURRENCY_SYMBOL,
  contractAddress: process.env.CONTRACT_ADDRESS,
  networkName: process.env.NETWORK_NAME,
  niftyDogAiApiKey: process.env.NIFTY_DOG_AI_API_KEY,
  openSeaApiKey: process.env.OPENSEA_API_KEY,
  rpcUrl: process.env.RPC_URL,
  symbolName: process.env.SYMBOL_NAME,
  userGamePasses: [],
  userWallet: null,
})

export const getters = {
  baseUrl: (state) => state.baseUrl,
  baseBackendUrl: (state) => state.baseBackendUrl,
  blockExplorerUrl: (state) => state.blockExplorerUrl,
  chainId: (state) => state.chainId,
  chainName: (state) => state.chainName,
  contractAddress: (state) => state.contractAddress,
  currencySymbol: (state) => state.currencySymbol,
  hasUserWallet: (state) => !!state.userWallet,
  networkName: (state) => state.networkName,
  niftyDogAiApiKey: (state) => state.niftyDogAiApiKey,
  openSeaApiKey: (state) => state.openSeaApiKey,
  rpcUrl: (state) => state.rpcUrl,
  symbolName: (state) => state.symbolName,
  userGamePasses: (state) => state.userGamePasses,
  userWallet: (state) => state.userWallet
}
export const actions = {
  setUserWallet({commit}, wallet) {
    commit('SET_USER_WALLET', wallet)
  },
  
  buyToken() {
    console.log('got to the buying token action')
    console.log(process.env.CONTRACT_ADDRESS)
  },
  
}

export const mutations = {
  SET_USER_WALLET(state, wallet) {
    state.userWallet = wallet
  },
  TOGGLE_CHOSEN_IMAGE_MODAL(state, bool) {
    state.showChosenImageModal = bool
  }
}
