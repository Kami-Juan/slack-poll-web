import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ModalPlugin } from 'bootstrap-vue'

import { mount, createLocalVue } from '@vue/test-utils'
import PollTitle from './../../../src/components/Poll/PollTitle'

describe('test PollTitle.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(LayoutPlugin)
  localVue.use(ModalPlugin)

  it('should be render', async () => {
    const cmp = mount(PollTitle, {localVue})

    await cmp.vm.$nextTick()

    expect(cmp.element).toMatchSnapshot()
  })

  it('the poll title has the correct value', () => {
    const cmp = mount(PollTitle, {localVue, propsData: {
      value: 'I"m title'
    }})

    let titleInput = cmp.find('#title-input').element.value
    expect(titleInput).toEqual('I"m title')
  })

  it('set data in the poll title and fire the input event', () => {
    const cmp = mount(PollTitle, {localVue})

    const titleInput = cmp.find('#title-input')
    titleInput.setValue('I"m title two')

    expect(cmp.emitted().input).toBeTruthy()
    expect(cmp.emitted().input.length).toBe(1)
    expect(cmp.emitted().input[0]).toEqual(['I"m title two'])
  })

  it('set attribute in the component and the poll title get it', () => {
    const cmp = mount(PollTitle, {localVue, attrs: {
      type: 'password',
      name: 'title-input',
      placeholder: 'new placeholder'
    }})

    const titleInput = cmp.find('#title-input').attributes()

    expect(titleInput.type).not.toBe('password')
    expect(titleInput.name).toBe('title-input')
    expect(titleInput.placeholder).not.toBe('new placeholder')
  })

  it('set listener and in the component and the title input fire it', async () => {
    const clickHandler = jest.fn()

    const cmp = mount(PollTitle, {localVue, listeners: {
      keyup: clickHandler
    }})

    const pollInput = cmp.find('#title-input')
    pollInput.trigger('keyup.enter')

    expect(clickHandler).toHaveBeenCalled()
  })
})