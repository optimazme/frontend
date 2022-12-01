export const state = () => ({
  cameraX: 0,
  cameraY: 1.6,
  cameraZ: 0,
  foundImages: [],
  foundPhrases: [],
  gameEndTime: null,
  hasGameEnded: false,
  mazeImages: [],
  minutesLeft: 0,
  pfpSource: 'http://localhost:3000/maze/demo_floor.png',
  prompt: [],
  showImages: [],
  showNavigation: false,
  subject: ''
})

export const getters = {
  cameraXPosition: state => state.cameraX,
  cameraYPosition: state => state.cameraY,
  cameraZPosition: state => state.cameraZ,
  foundImages: state => state.foundImages,
  foundImagesLength: state => state.foundImages.length,
  foundPhrases: state => state.foundPhrases,
  gameEndTime: state => state.gameEndTime,
  hasGameEnded: state => state.hasGameEnded,
  mazeImages: state => state.mazeImages,
  minutesLeft: state => state.minutesLeft,
  pfpSource: state => state.pfpSource,
  prompt: state => state.prompt,
  showImages: state => state.showImages,
  showImagesLength: state => state.showImages.length,
  showNavigation: state => state.showNavigation,
  subject: state => state.subject
}

export const actions = {
  endGame({ commit, state }) {
    commit('END_GAME')
    const phrases = state.foundImages.map(x => x.word)
    commit('SET_FOUND_PHRASES', phrases)
  },
  gameEndTime({ commit }, endTime) {
    commit('GAME_END_TIME', endTime)
  },
  minutesLeft({commit}, minute) {
    commit('MINUTES_LEFT', minute)
  },
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
  setFoundPhrases({ commit }, phrases) {
    commit('SET_FOUND_PHRASES', phrases)
  },
  setMazeImages({commit}, images) {
    commit('SET_MAZE_IMAGES', images)
  },
  setPfpSource({ commit }, src) {
    commit('SET_PFP_SOURCE', src)
  },
  setPrompt({ commit }, prompt) {
    commit('SET_PROMPT', prompt)
  },
  setShowImages({ commit }, images) {
    commit('SET_SHOW_IMAGES', images)
  },
  setShowNavigation({ commit }, bool) {
    commit('SET_SHOW_NAVIGATION', bool)
  },
  setSubject({ commit }, subject) {
    commit('SET_SUBJECT', subject)
  },
  startGame({ commit }) {
    commit('START_GAME')
  },
}

export const mutations = {
  END_GAME(state) {
    state.hasGameEnded = true
  },
  GAME_END_TIME(state, endTime) {
    state.gameEndTime = endTime
  },
  MINUTES_LEFT(state, minute) {
    state.minutesLeft = minute
  },
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
  SET_FOUND_PHRASES(state, phrases) {
    phrases.unshift(state.subject)
    
    state.foundPhrases = phrases
  },
  SET_MAZE_IMAGES(state, images) {
    state.mazeImages = images
  },
  SET_PFP_SOURCE(state, src) {
    state.pfpSource = src
  },
  SET_PROMPT(state, prompt) {
    state.prompt = prompt
  },
  SET_SHOW_IMAGES(state, images) {
    state.showImages = images
  },
  SET_SHOW_NAVIGATION(state, bool) {
    state.showNavigation = bool
  },
  SET_SUBJECT(state, subject) {
    state.subject = subject
  },
  START_GAME(state) {
    state.hasGameEnded = false
  },
}