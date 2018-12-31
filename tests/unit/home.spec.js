import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

Vue.use(Vuetify)
Vue.use(Vuex)

describe('Home.vue', () => {

  it('Checks if component is rendering properly', () => {
    const wrapper = shallowMount(Home)
    
    // Test if card title text renders as expected
    const title = 'Online Math Sequence Calculator'
    expect(wrapper.find('#card-title').text()).toMatch(title)

    // Test math sequence select field if content is the same as the data
    const items = wrapper.find('#sequence-field').attributes('items')
    const sequenceList = wrapper.vm.sequenceList.join(',')
    expect(items).toMatch(sequenceList)

    // Test default data values
    expect(wrapper.vm.form.currentValue).toBe('')
    expect(wrapper.vm.form.currentSequence).toBe('')
    expect(wrapper.vm.form.currentStart).toBeNull()
    expect(wrapper.vm.form.currentRange).toBeNull()

    const nextBttnText = 'Get Next Value'
    const clearBttnText = 'Reset'

    expect(wrapper.find('#submit-bttn').text()).toMatch(nextBttnText)
    expect(wrapper.find('#clear-bttn').text()).toMatch(clearBttnText)
  })

  it('Checks default field behaviors if current sequence is range', () => {
    const wrapper = shallowMount(Home)

    // Check if buttons are disabled by default
    expect(wrapper.find('#submit-bttn').attributes('disabled')).toBeTruthy
    expect(wrapper.find('#clear-bttn').attributes('disabled')).toBeTruthy

    // Start and Range fields should not exist by default
    expect(wrapper.find('#start-field').exists()).toBeFalsy
    expect(wrapper.find('#range-field').exists()).toBeFalsy

    // After setting the current sequence, buttons should not be disabled anymore
    wrapper.vm.form.currentSequence = 'range'
    expect(wrapper.find('#submit-bttn').attributes('disabled')).toBeUndefined
    expect(wrapper.find('#clear-bttn').attributes('disabled')).toBeUndefined
    expect(wrapper.find('#start-field').exists()).toBeTruthy
    expect(wrapper.find('#range-field').exists()).toBeTruthy
  })

  it('Checks default field behaviors if current sequence is factorial', () => {
    const wrapper = shallowMount(Home)

    // Check if buttons are disabled by default
    expect(wrapper.find('#submit-bttn').attributes('disabled')).toBeTruthy
    expect(wrapper.find('#clear-bttn').attributes('disabled')).toBeTruthy

    wrapper.vm.form.currentSequence = 'factorial'
    expect(wrapper.find('#submit-bttn').attributes('disabled')).toBeUndefined
    expect(wrapper.find('#clear-bttn').attributes('disabled')).toBeUndefined
  })
})
