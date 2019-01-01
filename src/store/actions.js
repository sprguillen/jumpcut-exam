/**
 * Function to handle the factorial sequence
 * @param {number} iteration is the current iteration
 */
const factorialSeq = (iteration = 1) => {
  if (iteration === 0 || iteration === 1) {
    return 1
  }

  // result will store the values
  // which will contain the factorial
  let result = iteration

  while (iteration > 1) {
    iteration--
    result *= iteration
  }

  return result
}

/**
 * Function to handle the fibonacci sequence
 * @param {number} iteration is the current iteration
 */
const fibonacciSeq = (iteration = 1) => {
  let current = 1 // current iteration
  let last = 0 // last iteration before the current

  let temp // store temporary 

  while (iteration >= 0) {
    temp = current
    // fibonacci logic here where you add the current and last numbers
    current = current + last
    // switch the current going to the last
    last = temp
    iteration--
  }

  return last
}

/**
 * Simple function to return number to itself
 * as a way of a function being called by the
 * generator in purposes of keeping the flow
 * same as with the other functions
 */
const rangeSeq = (iteration, range) => iteration += range;

const generator = function* generator(opt, iteration, range) {
  /**
   * Range will actually be dictated by the iteration
   * which will be added by the range per loop pass,
   * with the function only returning the same parameter
   */
  if (opt.name === 'rangeSeq') {
    while (true) {
      let result = opt(iteration, range)
      yield result
    }
  } else {
    while (iteration > -1) {
      let result = opt(iteration)
      yield result
    }
  }
}

export default {
  /**
   * Run generator function which will in turn
   * run 2 mutations: setCurrentSequence and setCurrentValue
   */
  runGenerator({ commit, state }, currentSequence) {
    commit('setCurrentSequence', currentSequence)
    
    let currentValue
    if (currentSequence === 'factorial') {
      const factorialGen = generator(factorialSeq,
        state.currentIteration, state.currentRange)
      currentValue = factorialGen.next().value
      commit('setCurrentValue', currentValue) // set current value
    } else if (currentSequence === 'fibonacci') {
      const fibonacciGen = generator(fibonacciSeq,
        state.currentIteration, state.currentRange)
      currentValue = fibonacciGen.next().value
      commit('setCurrentValue', currentValue) // set current value
    } else {
      const rangeGen = generator(rangeSeq,
        state.currentStart, state.currentRange)
      currentValue = rangeGen.next().value
      // this one's different the current start for range is the next value
      // and the current value is current start minus the range
      commit('setCurrentStart', currentValue)
      commit('setCurrentValue', currentValue - state.currentRange)
    }

    commit('setNextIteration')
  }
}