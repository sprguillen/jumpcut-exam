<template>
  <div class="even">
    <v-chip :color="isEvenNumber ? 'teal' : 'error'" text-color="white">
      <v-avatar>
        <v-icon v-if="isEvenNumber">check_circle</v-icon>
        <v-icon v-else>highlight_off</v-icon>
      </v-avatar>
      {{ componentTextOutput }}
    </v-chip>
  </div>
</template>
<script>
export default {
  name: 'Even',
  props: {
    currentValue: {
      required: true
    }
  },
  computed: {
    isEvenNumber() {
      return this.currentValue % 2 === 0
    },
    componentTextOutput() {
      if (this.isEvenNumber) {
        return 'Result is an even number'
      }

      return 'Result is not an even number'
    }
  }
}
</script>
