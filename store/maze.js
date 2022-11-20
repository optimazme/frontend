export const state = () => ({
  cameraX: 0,
  cameraY: 1.6,
  cameraZ: 0,
  foundImages: [],
  showImages: [],
  showNavigation: false,
})

export const getters = {
  cameraXPosition: state => state.cameraX,
  cameraYPosition: state => state.cameraY,
  cameraZPosition: state => state.cameraZ,
  foundImages: state => state.foundImages,
  foundImagesLength: state => state.foundImages.length,
  showImages: state => state.showImages,
  showImagesLength: state => state.showImages.length,
  showNavigation: state => state.showNavigation
}

export const actions = {
  setCameraX({commit}, xPosition) {
    commit('SET_X_POSITION', xPosition)
  },
  setCameraY({commit}, yPosition) {
    commit('SET_Y_POSITION', yPosition)
  },
  setCameraZ({ commit }, zPosition) {
    commit('SET_Z_POSITION', zPosition)
  },
  setFoundImage({ commit }, imageInfo) {
    commit('SET_FOUND_IMAGE', imageInfo)
  },
  setShowImages({ commit }, images) {
    commit('SET_SHOW_IMAGES', images)
  },
  setShowNavigation({ commit }, bool) {
    commit('SET_SHOW_NAVIGATION', bool)
  }
}

export const mutations = {
  SET_X_POSITION(state, xPosition) {
    state.cameraX = xPosition
  },
  SET_Y_POSITION(state, yPosition) {
    state.cameraY = yPosition
  },
  SET_Z_POSITION(state, zPosition) {
    state.cameraZ = zPosition
  },
  SET_FOUND_IMAGE(state, imageInfo) {
    state.foundImages.push(imageInfo)
  },
  SET_SHOW_IMAGES(state, images) {
    state.showImages = images
  },
  SET_SHOW_NAVIGATION(state, bool) {
    state.showNavigation = bool
  }
}