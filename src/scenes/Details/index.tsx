import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { SettingsStackParamsList, TaskType } from '../..'
import { PinkButton } from '../../components/PinkButton/index'
import { Routes } from '../../routes/Routes'
import { updateTodoItem } from '../../store/todos/actions'
import { strings } from '../../strings'
import { Color } from '../../styles/Color'

export const Details: React.FunctionComponent = () => {
  const { params } =
    useRoute<RouteProp<SettingsStackParamsList, Routes.Details>>()

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleClick = (idTask: string, completed: boolean) => {
    dispatch(updateTodoItem({ completed: !completed, id: idTask }))
    navigation.goBack()
  }
  const handleEditTask = (task: TaskType) => {
    navigation.navigate(Routes.NewTask, { task })
  }

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            handleEditTask(params.task)
          }}>
          <Text style={styles.rightButton}>{strings.edit}</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text testID="taskStatus" style={styles.statusText}>
        {params.task.completed ? strings.done : strings.notDone}
      </Text>
      <Text testID="taskTitle" style={styles.taskTitle}>
        {params.task.title}
      </Text>
      <Text testID="taskDescription" style={styles.taskDescription}>
        {params.task.description}
      </Text>
      <PinkButton
        title={
          params.task.completed ? strings.unMarkButton : strings.markButton
        }
        onPress={() => handleClick(params.task.id, params.task.completed)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    padding: 15,
  },
  rightButton: {
    color: Color.White,
    fontSize: 18,
    marginRight: 15,
  },
  statusText: {
    color: Color.Pink,
    margin: 10,
    marginBottom: 5,
  },
  taskDescription: {
    color: Color.Grey,
    fontSize: 14,
    margin: 10,
  },
  taskTitle: {
    color: Color.Black,
    fontSize: 36,
    margin: 10,
    marginTop: 5,
  },
})
