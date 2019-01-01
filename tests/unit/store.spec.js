import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

describe('Vuex run generator action', () => {
  it('should run the generator action as expected', () => {
    const commit = jest.fn()
    const currentSequence = 'factorial'

    const state = {
      currentSequence: '',
      currentValue: '',
      currentIteration: 1,
      currentStart: 1,
      currentRange: 1
    }

    actions.runGenerator({ commit, state }, currentSequence)

    // run generator has been called
    expect(commit).toHaveBeenCalled()
  })

  it('mutations should work as expected', () => {
    const state = {
      currentSequence: '',
      currentValue: '',
      currentIteration: 1,
      currentStart: 1,
      currentRange: 1
    }

    let currentSequence = 'factorial'
    // before calling the mutation, current sequence should be
    // an empty string as expected
    expect(state.currentSequence).toMatch('')
    mutations.setCurrentSequence(state, currentSequence)

    // after calling the current sequence mutation, current
    // sequence should be updated to 'factorial'
    expect(state.currentSequence).toMatch(currentSequence)

    currentSequence = 'fibonacci'

    // then checks if it is updated to fibonacci
    mutations.setCurrentSequence(state, currentSequence)
    expect(state.currentSequence).toMatch(currentSequence)

    let currentIteration = `${state.currentIteration + 1}`

    // nextIteration which increments the current iteration should work
    mutations.setNextIteration(state)
    expect(state.currentIteration.toString()).toMatch(currentIteration)

    let currentValue = 120

    // current value should be changed as expected
    mutations.setCurrentValue(state, currentValue)
    expect(state.currentValue.toString()).toMatch(currentValue.toString())

    // finally reset form should be working as expected
    mutations.resetForm(state)
    expect(state.currentSequence).toMatch('')
    expect(state.currentValue).toMatch('')
    expect(state.currentIteration.toString()).toMatch('1')
  })
})

