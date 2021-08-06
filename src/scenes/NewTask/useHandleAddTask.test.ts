import { renderHook } from '@testing-library/react-hooks'
import { Alert } from 'react-native'
import { act } from 'react-test-renderer'

import { TaskType } from '../../index'
import { strings } from '../../strings'
import { useHandleAddTask } from './useHandleAddTask'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}))

const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: () => mockGoBack,
  }),
}))

const task: TaskType = {
  completed: false,
  description: 'desc tarea 1',
  id: '1',
  title: 'tarea1',
}

Alert.alert = jest.fn()

afterEach(jest.clearAllMocks)

describe('test handleAddTask', () => {
  const { result } = renderHook(() => useHandleAddTask())
  const spyAddTask = jest.spyOn(result.current, 'handleAddTask')

  it('handleAddTask function with title and description', () => {
    expect(typeof result.current.handleAddTask).toBe('function')

    act(() => {
      result.current.handleAddTask(task.description, task.title)
    })

    expect(spyAddTask).toHaveBeenCalledWith(task.description, task.title)
    expect(spyAddTask).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })

  it('handleAddTask function with title and no description', () => {
    act(() => {
      result.current.handleAddTask('', task.title)
    })

    expect(spyAddTask).toHaveBeenCalledWith('', task.title)
    expect(spyAddTask).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledTimes(0)
    expect(Alert.alert).toHaveBeenCalledWith(strings.invalidDescriptionError)
    expect(Alert.alert).toHaveBeenCalledTimes(1)
  })

  it('handleAddTask function with description and no title', () => {
    act(() => {
      result.current.handleAddTask(task.description, '')
    })

    expect(spyAddTask).toHaveBeenCalledWith(task.description, '')
    expect(spyAddTask).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledTimes(0)
    expect(Alert.alert).toHaveBeenCalledWith(strings.invalidTitleError)
    expect(Alert.alert).toHaveBeenCalledTimes(1)
  })

  it('handleAddTask function without title and description', () => {
    act(() => {
      result.current.handleAddTask('', '')
    })

    expect(spyAddTask).toHaveBeenCalledWith('', '')
    expect(spyAddTask).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledTimes(0)
    expect(Alert.alert).toHaveBeenCalledWith(
      strings.invalidTitleAndDescriptionError,
    )
    expect(Alert.alert).toHaveBeenCalledTimes(1)
  })
})
