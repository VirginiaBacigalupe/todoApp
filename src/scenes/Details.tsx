import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { SettingsStackParamsList } from '..'
import { PinkButton } from '../components/PinkButton'
import { Routes } from '../routes/Routes'
import { checkTodo } from '../store/slices/todoSlice'
import { Color } from '../styles/Color'

export const Details: React.FunctionComponent = () => {
  const { params } =
    useRoute<RouteProp<SettingsStackParamsList, Routes.Details>>()

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleClick = (idTask: string, isChecked: boolean) => {
    dispatch(checkTodo({ id: idTask, isChecked: !isChecked }))
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {params.task.isChecked ? 'Done' : 'Not done'}
      </Text>
      <Text style={styles.taskTitle}>{params.task.title}</Text>
      <Text style={styles.taskDescription}>{params.task.description}</Text>
      <PinkButton
        title={params.task.isChecked ? 'UNMARK' : 'MARK AS DONE'}
        onPress={() => handleClick(params.task.id, params.task.isChecked)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    padding: 15,
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
