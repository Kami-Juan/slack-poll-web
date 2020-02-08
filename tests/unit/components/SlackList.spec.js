import { shallowMount } from '@vue/test-utils'
import SlackList from './../../../src/components/Decoration/SlackList'
import SlackListItem from './../../../src/components/Decoration/SlackListItem'

describe('test SlackList.vue', () => {
  let cmp

  beforeEach(() => {
    const slackListItemWrapper = {
      render(h) {
        return h(SlackListItem, { props: { value: 'One element' } })
      }
    }

    cmp = shallowMount(SlackList, {
      slots: {
        default: slackListItemWrapper
      }
    })
  })

  it('should be render', () => {
    expect(cmp.element).toMatchSnapshot()
  })

  it('SlackListItem are inserted in the component', () => {
    const slackList = cmp.find(SlackList)
    expect(slackList.find(SlackListItem).isVueInstance()).toBe(true)
  })
})