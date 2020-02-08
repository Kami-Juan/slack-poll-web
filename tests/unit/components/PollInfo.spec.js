import { mount } from '@vue/test-utils'

import PollInfo from './../../../src/components/Poll/PollInfo'
import SlackSection from './../../../src/components/Decoration/SlackSection'

describe('test PollInfo.vue', () => {
  let cmp

  beforeEach(() => {
    const slackSectionWrapper = {
      render(h) {
        return h(SlackSection)
      }
    }

    cmp = mount(PollInfo, {
      propsData: {
        title: 'I"m title',
        multiple: false
      },
      components: {
        SlackSection
      },
      slots: {
        default: slackSectionWrapper
      }
    })
  })

  it('should be render', () => {
    expect(cmp.element).toMatchSnapshot()
  })

  it('the bot name has the correct text', () => {
    const botNameText = cmp.find('#bot-name').text()
    expect(botNameText).toBe('Yellow Poll')
  })

  it('the props has the correct validations', () => {

    const props = cmp.vm.$options.props

    expect(props.title.required).toBeTruthy()
    expect(props.title.type).toBe(String)

    expect(props.multiple.type).toBe(Boolean)
  })

  it('the poll title has the correct text', () => {
    cmp.setProps({title: 'I"m a poll title'})

    const pollTitleText = cmp.find('#poll-title').text()
    expect(pollTitleText).toBe('I"m a poll title')
  })

  it('the poll username has the correct text', () => {
    const pollUsernameText = cmp.find('#poll-username').text()
    expect(pollUsernameText).toBe('By: You')
  })

  it('the poll mode has the correct text', () => {
    const pollModeText = cmp.find('#poll-mode').text()
    expect(pollModeText).toBe('Mode:')
  })

  it('the multiple fires a update event when has clicked', () => {
    cmp.setProps({ multiple: true })

    const pollTypeButton = cmp.find('#poll-type')
    pollTypeButton.trigger('click')

    expect(cmp.emitted('update:multiple')).toBeTruthy()
    expect(cmp.emitted('update:multiple').length).toBe(1)
    expect(cmp.emitted('update:multiple')[0]).toEqual([false])
  })

  it('SlackList are inserted in the component', () => {
    const slackSections = cmp.findAll(SlackSection)
    expect(slackSections.length).toBe(2)
  })
})