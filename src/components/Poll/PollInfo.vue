<template>
  <div id="poll-info">
    <div id="bot-avatar"></div>
    <div id="bot-message">
      <h4 id="bot-name">Yellow Poll</h4>
      <slack-section>
        <div id="info-group">
          <h4 id="poll-title">{{ title }}</h4>
          <div id="poll-username">By: You</div>
          <div>
            <span id="poll-mode">Mode:</span>
            <a
              id="poll-type"
              @click="togglePollType"
            >
              {{ multiple ? 'Multiple' : 'Single' }}
            </a>
          </div>
        </div>
      </slack-section>
      <div id="options-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SlackSection from '../Decoration/SlackSection'

export default {
  name: 'PollInfo',
  components: {
    SlackSection
  },
  props: {
    title: {
      type: String,
      required: true
    },
    multiple: Boolean
  },
  methods: {
    togglePollType() {
      this.$emit('update:multiple', !this.multiple)
    }
  }
}
</script>

<style>
#poll-info {
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

#poll-title {
  font-family: LatoBold;
  font-size: 19px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 5px;
}

#poll-type {
  font-family: LatoBold;
  font-weight: bold;
  text-decoration: underline;
}

#bot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  background-color: var(--yellowme-color);
  margin-right: 10px;
}

#bot-name {
  font-family: LatoBold;
  font-size: 19px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 2px;
  text-align: left;
}

#options-slot {
  margin-top: 10px;
}
</style>