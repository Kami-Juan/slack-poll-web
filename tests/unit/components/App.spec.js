import {mount} from '@vue/test-utils'
import App from '../../../src/App'

describe('test App.js', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(App, {
      stubs: {
        Poll: '<div id="stub-poll"></div>'
      }
    })
  })

  it('should be render', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
