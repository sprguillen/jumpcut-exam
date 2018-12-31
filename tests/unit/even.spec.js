import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Even from '@/views/Even.vue'

Vue.use(Vuetify)

describe('Even.vue', () => {
  it('Checks if component works as expected when number provided is even', () => {
    const currentValue = 2
    const color = 'teal'
    const text = 'Result is an even number'
    const wrapper = shallowMount(Even, {
      propsData: {
        currentValue
      }
    })

    // Expect only accepts string values
    expect(wrapper.vm._props.currentValue.toString()).toMatch(currentValue.toString())

    // Output should match text because 2 is an even number
    expect(wrapper.vm.componentTextOutput).toMatch(text)

    // Should return to true because 2 is an even number
    expect(wrapper.vm.isEvenNumber).toBeTruthy()

    // Because it's even, teal should be the color of the chip
    expect(wrapper.find('#even-chip').attributes('color')).toMatch(color)
  })

  it('Checks if component works as expected when number provided is odd', () => {
    const currentValue = 1
    const color = 'error'
    const text = 'Result is not an even number'
    const wrapper = shallowMount(Even, {
      propsData: {
        currentValue
      }
    })

    // Expect only accepts string values
    expect(wrapper.vm._props.currentValue.toString()).toMatch(currentValue.toString())

    // Output should match text because 1 is an odd number
    expect(wrapper.vm.componentTextOutput).toMatch(text)

    // Should return to false because 1 is an odd number
    expect(wrapper.vm.isEvenNumber).toBeFalsy()

    // Because it's odd, red/error should be the color of the chip
    expect(wrapper.find('#even-chip').attributes('color')).toMatch(color)
  })
})