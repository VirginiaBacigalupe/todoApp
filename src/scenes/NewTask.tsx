import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { addTodo } from '../store/slices/todoSlice'
import { strings } from '../strings'
import { Color } from '../styles/Color'

export const NewTask = () => {
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
      dispatch(addTodo(task))
      navigation.goBack()
    }
  }

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
            handleAddTask(description, title)
          }}>
          <Text style={styles.rightButton}>{strings.saveButton}</Text>
        </TouchableOpacity>
      ),
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
