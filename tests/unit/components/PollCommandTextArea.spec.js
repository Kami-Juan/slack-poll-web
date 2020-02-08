import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ModalPlugin } from 'bootstrap-vue'

import { mount, createLocalVue } from '@vue/test-utils'
import PollCommandTextArea from './../../../src/components/Poll/PollCommandTextArea'

describe('test PollCommandTextArea.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(LayoutPlugin)
  localVue.use(ModalPlugin)

  it('should be render', () => {
    const cmp = mount(PollCommandTextArea, {localVue})
    expect(cmp.element).toMatchSnapshot()
  })

  it('the instruction title has the correct value', () => {
    const cmp = mount(PollCommandTextArea, {localVue})

    let instructionTitle = cmp.find('#instructions').text()
    expect(instructionTitle).toEqual('Copy-pasta your command into slack :^)')
  })

  it('the command input has the correct value', () => {
    const cmp = mount(PollCommandTextArea, {localVue, propsData: {
      value: 'I"m command'
    }})

    let commandInput = cmp.find('#command-input').element.value
    expect(commandInput).toEqual('I"m command')
  })

  it('set data in the command input and fire the input event', () => {
    const cmp = mount(PollCommandTextArea, {localVue})

    const commandInput = cmp.find('#command-input')
    commandInput.setValue('I"m command two')

    expect(cmp.emitted().input).toBeTruthy()
    expect(cmp.emitted().input.length).toBe(1)
    expect(cmp.emitted().input[0]).toEqual(['I"m command two'])
  })
})