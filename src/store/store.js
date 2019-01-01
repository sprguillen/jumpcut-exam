import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  state: {
    currentSequence: '', // current mathematical sequence
    currentValue: '', // current value which will be displayed to the result text
    currentIteration: 1, // current loop iteration on the sequence
    currentStart: 1, // current start (used only for the range sequence)
    currentRange: 1 // current range
  },
  getters: {
    getCurrentSequence(state) {
      return state.currentSequence
    },
    getCurrentValue(state) {
      return state.currentValue
    }
  }
})
