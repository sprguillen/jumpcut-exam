<template>
  <div class="home">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title id="card-title">Online Math Sequence Calculator</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="setNextVal" id="sequence-form">
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-select
                          id="sequence-field"
                          prepend-icon="input"
                          :items="sequenceList"
                          label="Mathematical Sequence"
                          v-model="form.currentSequence"
                          data-sequence
                        ></v-select>
                      </v-flex>
                      <v-flex v-if="getCurrentSequence === 'range'" xs12 sm12 md6 lg6>
                        <v-text-field
                          id="start-field"
                          prepend-icon="loupe"
                          label="Start"
                          :mask="numericalMask"
                          @input="storeCurrentStart($event)"
                        ></v-text-field>
                      </v-flex>
                      <v-flex v-if="getCurrentSequence === 'range'" xs12 sm12 md6 lg6>
                        <v-text-field
                          id="range-field"
                          prepend-icon="compare_arrows"
                          label="Range"
                          :mask="numericalMask"
                          @input="storeCurrentRange($event)"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-text-field
                          id="value-field"
                          prepend-icon="keyboard_arrow_right"
                          name="result"
                          label="Result"
                          type="number"
                          disabled="disabled"
                          v-model="form.currentValue"
                        ></v-text-field>
                      </v-flex>
                      <v-flex v-if="form.currentValue">
                        <even :currentValue="form.currentValue"></even>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    id="submit-bttn"
                    :disabled="disableNextButton"
                    color="success"
                    form="sequence-form"
                    type="submit"
                  >Get Next Value</v-btn>
                  <v-btn color="error"
                    id="clear-bttn"
                    :disabled="disableResetButton"
                    @click="hardReset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Even from '@/views/Even'

export default {
  name: 'Home',
  components: {
    Even
  },
  data () {
    return {
      sequenceList: ['factorial', 'fibonacci', 'range'],
      form: {
        currentSequence: '',
        currentValue: '',
        currentStart: null,
        currentRange: null
      },
      numericalMask: '#'
    };
  },
  computed: {

    /**
     * Sets the reset button to disabled by default
     * until the value textbox has been prepopulated
     */
    disableResetButton() {
      if (this.form.currentValue) {
        return false
      }

      return true
    },

    /**
     * Get current sequence to be watched
     * and to be used to display certain inputs
     * depending on the current sequence
     */
    getCurrentSequence() {
      return this.form.currentSequence
    },

    getCurrentRanges() {
      return this.form.currentStart && this.form.currentRange
    },

    /**
     * Sets the next value button to disabled by default
     * until sequence has been chosen
     */
    disableNextButton() {
      if (this.form.currentSequence === 'range' && this.getCurrentRanges) {
        return false
      } else if (this.form.currentSequence === 'factorial'
        || this.form.currentSequence === 'fibonacci') {
        return false
      }

      return true
    },

    /**
     * Call helper function map getters to assign getCurrentValue
     * getter from the store to this.getCurrentValue
     */
    ...mapGetters([
      'getCurrentValue'
    ])
  },
  methods: {

    /**
     * Click handler function
     */
    setNextVal() {
      this.runGenerator(this.form.currentSequence)
      this.form.currentValue = this.getCurrentValue
    },

    /**
     * Reset everything!
     * (Form model and call the reset mutation method)
     */
    hardReset() {
      this.form.currentSequence = ''
      this.form.currentValue = ''
      this.form.currentStart = null
      this.form.currentRange = null
      this.resetForm()
    },

    /**
     * Call vuex reset mutation here
     */
    resetForm() {
      this.$store.commit('resetForm')
    },

    /**
     * Reset only the current value
     */
    softReset() {
      this.form.currentValue = ''
      this.form.currentStart = null
      this.form.currentRange = null
      this.resetForm()
    },

    /**
     * Input handler of range textbox
     */
    storeCurrentStart(val) {
      val = parseInt(val)
      if (val && val > 0) {
        this.setCurrentStart(val)
        this.form.currentStart = val
      } else {
        this.form.currentStart = null
      }
    },

    /**
     * Input handler of range textbox
     */
    storeCurrentRange(val) {
      val = parseInt(val)
      if (val && val > 0) {
        this.setCurrentRange(val)
        this.form.currentRange = val
      } else {
        this.form.currentRange = null
      }
    },

    /**
     * Call helper function map actions to assign runGenerator
     * store to this.runGenerator
     */
    ...mapActions([
      'runGenerator'
    ]),

    /**
     * Call helper function map mutations to assign setCurrentStart
     * and setCurrentRange store to this.setCurrentStart and
     * this.setCurrentRange
     */
    ...mapMutations([
      'setCurrentStart',
      'setCurrentRange'
    ])
  },
  watch: {

    /**
     * Watch if the current sequence dropdown
     * is changed, if true then perform the
     * soft reset
     */
    getCurrentSequence(newVal, oldVal) {
      if (oldVal && oldVal !== newVal) {
        this.softReset()
      }
    }
  }
}
</script>
<style scoped>
#inspire {
  background: url("https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg");
}
</style>
