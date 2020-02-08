import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ModalPlugin } from 'bootstrap-vue'

import { mount, createLocalVue } from '@vue/test-utils'
import PollOptionInput from './../../../src/components/Poll/PollOptionInput'

describe('test PollOptionInput.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(LayoutPlugin)
  localVue.use(ModalPlugin)

  it('should be render', () => {
    const cmp = mount(PollOptionInput, {localVue})
    expect(cmp.element).toMatchSnapshot()
  })

  it('the poll input has the correct value', () => {
    const cmp = mount(PollOptionInput, {localVue, propsData: {
      value: 'I"m poll'
    }})

    let pollInput = cmp.find('#add-option-input').element.value
    expect(pollInput).toEqual('I"m poll')
  })

  it('set data in the poll input and fire the input event', () => {
    const cmp = mount(PollOptionInput, {localVue})

    const pollInput = cmp.find('#add-option-input')
    pollInput.setValue('I"m poll two')

    expect(cmp.emitted().input).toBeTruthy()
    expect(cmp.emitted().input.length).toBe(1)
    expect(cmp.emitted().input[0]).toEqual(['I"m poll two'])
  })

  it('set attribute in the component and the poll input get it', () => {
    const cmp = mount(PollOptionInput, {localVue, attrs: {
      type: 'password',
      name: 'input-password',
      placeholder: 'Add an amazing option'
    }})

    const pollInput = cmp.find('#add-option-input').attributes()

    expect(pollInput.type).toBe('password')
    expect(pollInput.name).toBe('input-password')
    expect(pollInput.placeholder).toBe('Add an amazing option')
  })

  it('set listener and in the component and the poll input fire it', async () => {
    const clickHandler = jest.fn()

    const cmp = mount(PollOptionInput, {localVue, listeners: {
      keyup: clickHandler
    }})

    const pollInput = cmp.find('#add-option-input')
    pollInput.trigger('keyup.enter')

    expect(clickHandler).toHaveBeenCalled()
  })
})