<template>
  <div class="Poll">
    <b-container>
      <b-row align-h="center">
        <b-col cols=6>
          <input type="text" v-model="title" id="title-input">
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols=6>
          <input type="text" v-model="newOptionText" @keyup.enter="addOption" id="add-option-input">
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols=6>
          <ul>
            <li v-for="option in options" :key="option.id">
              <input type="text" :value="option.value">
              <a @click="removeOption(option)">❌</a>
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols=6>
          <textarea v-model="command" id="command-input"></textarea>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { transcript } from './utils/transcriptor'

export default {
  name: 'Poll',
  methods: {
    addOption() {
      let id = 1
      if (this.options.length > 0) {
        id = this.options[0].id++
      }
      this.options.push({
        id: id,
        value: this.newOptionText
      })
      this.newOptionText = ''
    },

    removeOption(option) {
      this.options.splice(this.options.indexOf(option), 1)
    },
  },
  data() {
    return {
      title: '',
      newOptionText: '',
      options: [],
      multiple: false,
      command: ''
    }
  },
  updated() {
    this.command = transcript({
      title: this.title,
      options: this.options.map(option => option.value),
      multiple: this.multiple
    })
  }
}
</script>

<style scoped>
#title-input,
#add-option-input,
#command-input {
  width: 100%;
}
</style>