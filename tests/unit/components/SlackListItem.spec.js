import { mount } from '@vue/test-utils'
import SlackListItem from './../../../src/components/Decoration/SlackListItem'

describe('test SlackListItem.vue', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(SlackListItem, {
      propsData: {
        value: 'One element'
      }
    })
  })

  it('should be render', () => {
    expect(cmp.element).toMatchSnapshot()
  })

  it('the option input has the correct value', () => {
    let optionInput = cmp.find('.option-input-element').element.value
    expect(optionInput).toEqual('One element')
  })

  it('the delete button has the correct emoji', () => {
    const deleteButton = cmp.find('.option-remove-element')
    expect(deleteButton.text()).toEqual('❌')
  })

  it('set data in the option input and fire the input event', () => {
    const optionInput = cmp.find('.option-input-element')
    optionInput.setValue('Second element')

    expect(cmp.emitted().input).toBeTruthy()
    expect(cmp.emitted().input.length).toBe(1)
    expect(cmp.emitted().input[0]).toEqual(['Second element'])
  })

  it('click the remove button and fire a event', () => {
    const deleteButton = cmp.find('.option-remove-element')
    deleteButton.trigger('click')

    expect(cmp.emitted().remove).toBeTruthy()
    expect(cmp.emitted().remove.length).toBe(1)
    expect(cmp.emitted().remove[0]).toEqual([])
  })
})