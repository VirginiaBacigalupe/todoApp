import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { TaskType } from '../..'
import { Routes } from '../../routes/Routes'
import { checkTodo } from '../../store/slices/todoSlice'
import { Task } from './Task'

interface Props {
  task: TaskType
}
export const ListItem: React.FunctionComponent<Props> = ({ task }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleClickCheckbox = (idTask: string, isChecked: boolean) => {
    dispatch(checkTodo({ id: idTask, isChecked: !isChecked }))
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
        handleClickCheckbox={() => handleClickCheckbox(task.id, task.isChecked)}
      />
    </TouchableOpacity>
  )
}
