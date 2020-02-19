<template>
  <div class="Poll">
    <b-container>
      <poll-title v-model="title" @keyup.enter="focusOnNextInput" />
      <poll-option-input
        v-model="newOptionText"
        @keyup.enter="addOption"
        type="text"
        placeholder="Add an amazing option"
      />
      <b-row align-h="center" id="slack-message-container">
        <b-col cols="6">
          <poll-info :title="title" :multiple.sync="multiple">
            <slack-section>
              <slack-list>
                <slack-list-item
                  v-for="(option, key) in options"
                  :key="key"
                  :value="option.value"
                  @input="editOption($event, key)"
                  @remove="removeOption(key)"
                ></slack-list-item>
              </slack-list>
            </slack-section>
          </poll-info>
        </b-col>
      </b-row>
      <poll-command-text-area v-model="command" />
      <b-row align-h="center">
        <b-col cols="3">
          <a
            :class="successfulCopy ? 'text-success' : ''"
            @click="copyToClipboard"
          >{{ successfulCopy ? 'Copied!' : 'Copy' }}</a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { transcript } from './utils/transcriptor'

import PollTitle from './Poll/PollTitle'
import PollInfo from './Poll/PollInfo'
import PollOptionInput from './Poll/PollOptionInput'
import PollCommandTextArea from './Poll/PollCommandTextArea'

import SlackList from './Decoration/SlackList'
import SlackSection from './Decoration/SlackSection'
import SlackListItem from './Decoration/SlackListItem'

export default {
  name: 'Poll',
  components: {
    PollTitle,
    PollInfo,
    PollOptionInput,
    PollCommandTextArea,
    SlackSection,
    SlackList,
    SlackListItem
  },
  data() {
    return {
      title: '',
      newOptionText: '',
      options: [],
      multiple: false,
      command: '',
      successfulCopy: false
    }
  },
  mounted() {
    const storedTitle = localStorage.getItem('title')
    const storedOptions = localStorage.getItem('options')
    const storedMultiple = localStorage.getItem('multiple')

    this.title = storedTitle ? storedTitle : ''
    this.options = storedOptions ? JSON.parse(storedOptions) : []
    this.multiple = storedMultiple === 'true' ? true : false
  },
  updated() {
    this.updateCommand()
  },
  methods: {
    addOption() {
      if (!this.newOptionText) return

      this.options.push({
        value: this.newOptionText
      })

      this.newOptionText = ''
    },
    removeOption(key) {
      this.options.splice(key, 1)
    },
    editOption(newOption, key) {
      this.options = this.options.map((option, i) => i === key ? {value: newOption} : option )
    },
    focusOnNextInput() {
      document.getElementById('add-option-input').focus()
    },
    copyToClipboard() {
      let command = document.querySelector('#command-input')
      command.select()

      try {
        document.execCommand('copy')
        this.successfulCopy = true
      } catch {
        alert('Oops!')
      }
    },
    updateCommand() {
      this.command = transcript({
        title: this.title,
        options: this.options.map(option => option.value),
        multiple: this.multiple
      })
    },
  },
  watch: {
    command() {
      this.successfulCopy = false
    },
    title(newTitle) {
      localStorage.setItem('title', newTitle)
    },
    multiple(newValue) {
      this.updateCommand()
      localStorage.setItem('multiple', newValue)
    },
    options(newValue) {
      localStorage.setItem('options', JSON.stringify(newValue))
    }
  }
}
</script>

<style scoped>
#title-input,
#add-option-input,
#command-input {
  width: 100%;
}

#options-list {
  text-align: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#slack-message-container {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
