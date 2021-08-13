import { useRoute } from '@react-navigation/native'
import { shallow } from 'enzyme'
import React from 'react'
import { TextInput } from 'react-native'

import { TaskType } from '../../index'
import { NewTask } from './index'

jest.mock('@react-navigation/native')
jest.mock('react-redux')

const task: TaskType = {
  completed: false,
  description: 'desc tarea 1',
  id: '1',
  title: 'tarea1',
}

const mockUseRoute = useRoute as jest.Mock

afterEach(jest.clearAllMocks)

describe('NewTask', () => {
  it('render new task screen', () => {
    mockUseRoute.mockReturnValue({ params: {} })
    const wrapper = shallow(<NewTask />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(TextInput)).toHaveLength(2)
  })

  it('render edit screen', () => {
    mockUseRoute.mockReturnValue({ params: { task } })
    React.useState = jest
      .fn()
      .mockReturnValueOnce([task.description, {}])
      .mockReturnValueOnce([task.title, {}])

    const wrapper = shallow(<NewTask />)
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find(TextInput)).toHaveLength(2)

    const descTextInput = wrapper.find('[testID="inputDescription"]')
    descTextInput.simulate('change', { target: { value: task.description } })
    expect(descTextInput.prop('value')).toEqual(task.description)

    const titleTextInput = wrapper.find('[testID="inputTitle"]')
    titleTextInput.simulate('change', { target: { value: task.title } })
    expect(titleTextInput.prop('value')).toEqual(task.title)
  })
})
