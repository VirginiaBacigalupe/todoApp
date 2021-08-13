import { useRoute } from '@react-navigation/native'
import { shallow } from 'enzyme'
import React from 'react'
import { Text } from 'react-native'

import { TaskType } from '../..'
import { Details } from './index'

jest.mock('@react-navigation/native')
jest.mock('react-redux')

const mockUseRoute = useRoute as jest.Mock

const task: TaskType = {
  completed: false,
  description: 'desc tarea 1',
  id: '1',
  title: 'tarea1',
}

describe('Details screen', () => {
  it('render ok', () => {
    mockUseRoute.mockReturnValue({ params: { task } })
    const wrapper = shallow(<Details></Details>)
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find(Text)).toHaveLength(3)

    const taskStatusText = wrapper.find('[testID="taskStatus"]').length
    expect(taskStatusText).toEqual(1)
    expect(taskStatusText.valueOf)

    const taskTitleText = wrapper.find('[testID="taskTitle"]').length
    expect(taskTitleText).toEqual(1)

    const taskDescriptionText = wrapper.find(
      '[testID="taskDescription"]',
    ).length
    expect(taskDescriptionText).toEqual(1)
  })
})
