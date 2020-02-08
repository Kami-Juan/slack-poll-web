import { transcript } from './../../../src/components/utils/transcriptor'

describe('test transcriptor.js', () => {
  test('generate a default message when doesn"t have parameters', () => {
    const pollCommand = transcript()
    expect(pollCommand).toBeNull()
  })

  test('don"t generate a command when don"t have options', () => {
    const pollCommand = transcript({
      title: 'test',
      options: null,
      multiple: false,
    })
    expect(pollCommand).toBeNull()
  })

  test('generate a default message when have only options setted', () => {
    const pollCommand = transcript({
      title: null,
      options: ['Frijoles'],
      multiple: false,
    })

    expect(pollCommand).toBe('/poll "Awesome Poll" "Frijoles"')
  })

  test('generate a default message when have only options setted and the multiple flag is true', () => {
    const pollCommand = transcript({
      title: null,
      options: ['Frijoles'],
      multiple: true,
    })

    expect(pollCommand).toBe('/poll "Awesome Poll" "Frijoles" -m')
  })

  test('generate a complete command when have any parameters setted', () => {
    const pollCommand = transcript({
      title: 'test',
      options: ['Frijoles'],
      multiple: true,
    })

    expect(pollCommand).toBe('/poll "test" "Frijoles" -m')
  })
})