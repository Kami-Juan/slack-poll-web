import { shallowMount } from '@vue/test-utils'
import SlackList from './../../../src/components/Decoration/SlackList'
import SlackSection from './../../../src/components/Decoration/SlackSection'

describe('test SlackSection.vue', () => {
  let cmp

  beforeEach(() => {
    const slackListWrapper = {
      render(h) {
        return h(SlackList, { props: { value: 'One element' } })
      }
    }

    cmp = shallowMount(SlackSection, {
      slots: {
        default: slackListWrapper
      }
    })
  })

  it('should be render', () => {
    expect(cmp.element).toMatchSnapshot()
  })

  it('SlackList are inserted in the component', () => {
    const slackSection = cmp.find(SlackSection)
    expect(slackSection.find(SlackList).isVueInstance()).toBe(true)
  })
})