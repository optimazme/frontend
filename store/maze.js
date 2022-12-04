export const state = () => ({
  cameraX: 0,
  cameraY: 1.6,
  cameraZ: 0,
  foundImages: [],
  foundPhrases: [],
  gameEndTime: null,
  gamePassNonce: '',
  hasGameEnded: false,
  hasGameStarted: false,
  mazeImages: [],
  minutesLeft: 0,
  pfpSource: 'http://localhost:3000/mazes/demo_floor.png',
  prompt: [],
  mazeInfo: {},
  mazeObj: 'http://localhost:3000/mazes/demo.glb',
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
  gamePassNonce: state => state.gamePassNonce,
  hasGameEnded: state => state.hasGameEnded,
  hasGameStarted: state => state.hasGameStarted,
  mazeImages: state => state.mazeImages,
  mazeInfo: state => state.mazeInfo,
  mazeObj: state => state.mazeObj,
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
  setHasGameStarted({commit}, bool) {
    commit('SET_HAS_GAME_STARTED', bool)
  },
  setFoundImage({ commit }, imageInfo) {
    commit('SET_FOUND_IMAGE', imageInfo)
  },
  setFoundPhrases({ commit }, phrases) {
    commit('SET_FOUND_PHRASES', phrases)
  },
  setGamePassNonce({ commit }, nonce) {
    commit('SET_GAME_PASS_NONCE', nonce)
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
  setMazeInfo({ commit }, mazeInfo) {
    commit('SET_MAZE_INFO', mazeInfo)
  },
  setMazeObj({ commit}, mazeObj) {
    commit('SET_MAZE_OBJ', mazeObj)
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
    commit('SET_HAS_GAME_STARTED', true)
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
  SET_GAME_PASS_NONCE(state, nonce) {
    state.gamePassNonce = nonce
  },
  SET_HAS_GAME_STARTED(state, bool) {
    state.hasGameStarted = bool
  },
  SET_MAZE_IMAGES(state, images) {
    state.mazeImages = images
  },
  SET_MAZE_INFO(state, mazeInfo) {
    state.mazeInfo = mazeInfo
  },
  SET_MAZE_OBJ(state, mazeObj) {
    state.mazeObj = mazeObj
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