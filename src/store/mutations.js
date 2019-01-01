export default {
  setCurrentSequence(state, currentSequence) {
    state.currentSequence = currentSequence
  },
  setCurrentValue(state, currentValue) {
    state.currentValue = currentValue
  },
  setCurrentStart(state, start) {
    state.currentStart = start
  },
  setCurrentRange(state, range) {
    state.currentRange = range
  },
  setNextIteration(state) {
    state.currentIteration++
  },
  resetForm(state) {
    state.currentSequence = ''
    state.currentValue = ''
    state.currentIteration = 1
    state.currentStart = 1
    state.currentRange = 1
  }
}