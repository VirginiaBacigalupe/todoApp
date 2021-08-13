import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { TaskType } from '../../..'
import { Routes } from '../../../routes/Routes'
import { updateTodoItem } from '../../../store/todos/actions'
import { Task } from '../Task/index'

interface Props {
  task: TaskType
}
export const ListItem: React.FunctionComponent<Props> = ({ task }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleClickCheckbox = (idTask: string, completed: boolean) => {
    dispatch(updateTodoItem({ completed: !completed, id: idTask }))
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.Details, {
          task: task,
        })
      }>
      <Task
        task={task}
        handleClickCheckbox={() => handleClickCheckbox(task.id, task.completed)}
      />
    </TouchableOpacity>
  )
}
