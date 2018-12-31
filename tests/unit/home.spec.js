import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {

  beforeEach(() => {
    Vue.use(Vuetify)
  })

  it('Checks if component is rendering properly', () => {
    const wrapper = shallowMount(Home)
    console.log(wrapper.html())
    // expect(wrapper.text()).toMatch(msg)
  })
})
