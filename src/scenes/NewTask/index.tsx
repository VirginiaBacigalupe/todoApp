import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { SettingsStackParamsList } from '../../index'
import { Routes } from '../../routes/Routes'
import { updateTodoItem } from '../../store/todos/actions'
import { strings } from '../../strings'
import { Color } from '../../styles/Color'
import { useHandleAddTask } from './useHandleAddTask'

export const NewTask: React.FunctionComponent = () => {
  const { params } =
    useRoute<RouteProp<SettingsStackParamsList, Routes.NewTask>>()

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [description, setDescription] = React.useState('')
  const [title, setTitle] = React.useState('')

  const handleCancel = () => {
    navigation.goBack()
  }

  const handleEditTask = (description: string, title: string) => {
    if (params?.task) {
      dispatch(updateTodoItem({ description, id: params.task.id, title }))
      navigation.navigate(Routes.Home)
    }
  }

  const { handleAddTask } = useHandleAddTask()

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
        testID="inputTitle"
        style={styles.inputTitle}
        placeholder={'Task title'}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        testID="inputDescription"
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
