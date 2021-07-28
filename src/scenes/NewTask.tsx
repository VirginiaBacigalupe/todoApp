import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { SettingsStackParamsList } from '..'
import { Routes } from '../routes/Routes'
import { addTodoItem, updateTodoItem } from '../store/todos/actions'
import { strings } from '../strings'
import { Color } from '../styles/Color'

export const NewTask: React.FunctionComponent = () => {
  const { params } =
    useRoute<RouteProp<SettingsStackParamsList, Routes.NewTask>>()

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')

  const handleCancel = () => {
    navigation.goBack()
  }

  const handleAddTask = (description: string, title: string) => {
    if (description && title) {
      const task = { description, title }
      dispatch(addTodoItem(task))
      navigation.goBack()
    }
  }

  const handleEditTask = (description: string, title: string) => {
    if (params?.task) {
      dispatch(updateTodoItem({ description, id: params.task.id, title }))
      navigation.navigate(Routes.Home)
    }
  }

  useEffect(() => {
    if (params?.task) {
      setDescription(params.task.description)
      setTitle(params.task.title)
    }
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerLeft: () => (
        <TouchableOpacity onPress={() => handleCancel()}>
          <Text style={styles.leftButton}>{strings.cancelButton}</Text>
        </TouchableOpacity>
      ),
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            params?.task
              ? handleEditTask(description, title)
              : handleAddTask(description, title)
          }}>
          <Text style={styles.rightButton}>{strings.saveButton}</Text>
        </TouchableOpacity>
      ),
      title: params?.task ? strings.editTaskHeader : strings.newTaskHeader,
    })
  }, [navigation, description, title])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.writeTaskWrapper}>
      <TextInput
        style={styles.inputTitle}
        placeholder={'Task title'}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.inputDescription}
        placeholder={'Task description'}
        value={description}
        onChangeText={text => setDescription(text)}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputDescription: {
    alignItems: 'flex-start',
    backgroundColor: Color.White,
    padding: '5%',
    paddingBottom: '20%',
    width: '100%',
  },
  inputTitle: {
    backgroundColor: Color.White,
    borderBottomColor: Color.Pink,
    borderBottomWidth: 1,
    fontSize: 20,
    padding: '5%',
    width: '100%',
  },
  leftButton: {
    color: Color.White,
    fontSize: 16,
    marginLeft: 15,
  },
  rightButton: {
    color: Color.White,
    fontSize: 16,
    marginRight: 15,
  },
  writeTaskWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
})
