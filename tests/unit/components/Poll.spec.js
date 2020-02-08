import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ModalPlugin } from 'bootstrap-vue'

import { shallowMount, createLocalVue, mount } from '@vue/test-utils'

import Poll from './../../../src/components/Poll'
import PollOptionInput from './../../../src/components/Poll/PollOptionInput'
import PollCommandTextArea from './../../../src/components/Poll/PollCommandTextArea'


describe('test Poll.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(LayoutPlugin)
  localVue.use(ModalPlugin)

  beforeEach(() => {
    localStorage.clear()
  })

  it('should be render', () => {
    const cmp = mount(Poll, {localVue, components: { PollOptionInput }})
    expect(cmp.element).toMatchSnapshot()
  })

  it('set default data if in the localstorage don"t have information', async () => {
    const cmp = shallowMount(Poll, {localVue})

    await cmp.vm.$nextTick()

    expect(cmp.vm.title).toBe('')
    expect(cmp.vm.options).toStrictEqual([])
    expect(cmp.vm.multiple).toBe(false)
  })

  it('should be setted data from the localstorage', async () => {
    localStorage.setItem('title', 'test')
    localStorage.setItem('options', '[{"value": "frijoles"}]')
    localStorage.setItem('multiple', 'true')

    const cmp = shallowMount(Poll, {localVue})

    await cmp.vm.$nextTick()

    expect(cmp.vm.title).toBe('test')
    expect(cmp.vm.options).toStrictEqual([{ value: 'frijoles' }])
    expect(cmp.vm.multiple).toBe(true)
  })

  it('doesn"t add a option if doesn"t have information to added', async () => {
    const cmp = shallowMount(Poll, {localVue})

    cmp.vm.addOption()

    expect(cmp.vm.options.length).toBe(0)
  })

  it('add a option if have information to added', async () => {
    const cmp = shallowMount(Poll, {localVue})

    cmp.setData({ newOptionText: 'Tamales' })
    cmp.vm.addOption()

    const optionsOffline = localStorage.getItem('options')

    expect(cmp.vm.options.length).toBe(1)
    expect(cmp.vm.newOptionText).toBe('')
    expect(optionsOffline).not.toBeNull()
  })

  it('remove a option and update the localstorage', async () => {
    const cmp = shallowMount(Poll, {localVue})

    cmp.setData({ options: [{ value: 'Tamales' }] })
    cmp.vm.removeOption(0)

    const optionsOffline = localStorage.getItem('options')

    expect(optionsOffline).toBe('[]')
  })

  it('update a option and change the value in the localstorage', () => {
    const cmp = shallowMount(Poll, {localVue})
    cmp.setData({ options: [{ value: 'Tamales' }] })
    cmp.vm.updateOptionPersisted('Hojaldras', 0)

    const optionsOffline = JSON.parse(localStorage.getItem('options'))

    expect(cmp.vm.options[0].value).toBe('Hojaldras')
    expect(optionsOffline.length).toBe(1)
    expect(optionsOffline[0].value).toBe('Hojaldras')
  })

  it('update a option who doesn"t exists in the list', () => {
    const cmp = shallowMount(Poll, {localVue})
    cmp.setData({ options: [{ value: 'Tamales' }] })
    cmp.vm.updateOptionPersisted('Hojaldras', 1)

    const optionsOffline = JSON.parse(localStorage.getItem('options'))

    expect(cmp.vm.options[0].value).toBe('Tamales')
    expect(optionsOffline.length).toBe(1)
    expect(optionsOffline[0].value).toBe('Tamales')
  })

  it('change the current focus to another option', async () => {
    const cmp = mount(Poll, {localVue, components: { PollOptionInput }, attachToDocument: true})

    cmp.vm.focusOnNextInput()
    const optionInput = cmp.find('#add-option-input').element

    expect(optionInput).toBe(document.activeElement)
  })

  it('no copy the command from the command-textarea because the browser no supported', () => {
    window.alert = jest.fn()
    const cmp = mount(Poll, {localVue, components: { PollCommandTextArea }, attachToDocument: true})

    cmp.vm.copyToClipboard()

    expect(window.alert).toHaveBeenCalled()
    expect(cmp.vm.successfulCopy).toBe(false)
  })

  it('copy the command from the command-textarea', () => {
    document.execCommand = jest.fn()
    const cmp = mount(Poll, {localVue, components: { PollCommandTextArea }, attachToDocument: true})

    cmp.vm.copyToClipboard()
    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(cmp.vm.successfulCopy).toBe(true)
  })

  it('update the title when is changed', () => {
    localStorage.setItem('title', 'test 1')

    const cmp = mount(Poll, {localVue})
    cmp.setData({ title: 'test 2' })

    const titleOffline = localStorage.getItem('title')

    expect(titleOffline).toBe('test 2')
  })

  it('update the multiple value when is changed', () => {
    localStorage.setItem('multiple', 'true')

    let cmp = mount(Poll, {localVue})

    cmp.vm.updateCommand = jest.fn()
    cmp.setData({ multiple: false })

    const multipleOffline = localStorage.getItem('multiple')

    expect(multipleOffline).toBe('false')
    expect(cmp.vm.updateCommand).toBeCalled()
  })
})