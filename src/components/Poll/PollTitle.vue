<template>
  <div id="poll-title">
    <b-row align-h="center">
      <b-col cols="12" md="6">
        <input
          id="title-input"
          type="text"
          placeholder="Here goes your poll title"
          autocomplete="off"
          v-bind="$attrs"
          :value="value"
          v-on="customListeners"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'PollTitle',
  props: ['value'],
  inheritAttrs: false,
  computed: {
    customListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      }
    }
  },
  mounted() {
    document.getElementById('title-input')?.focus()
  }
}
</script>

<style>
#title-input {
  font-family: LatoBold;
  width: 100%;
  outline: none;
  border: 0;
  font-size: 48px;
  color: var(--main-font-primary-color);
}

#title-input::placeholder {
  color: var(--main-font-secondary-color);
}
</style>
