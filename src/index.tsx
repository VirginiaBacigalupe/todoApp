import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Header } from './components/Header'
import { Task } from './components/Task'
import { Color } from './styles/Color'

export interface TaskType {
  title: string
  description: string
  isChecked: boolean
}

export const App = () => {
  const [task, setTask] = useState<TaskType>({
    description: '',
    isChecked: false,
    title: '',
  })
  const [taskItems, setTaskItems] = useState<TaskType[]>([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    if (task.description && task.title) {
      setTaskItems([...taskItems, task])
      setTask({ description: '', isChecked: false, title: '' })
    }
  }

  const handleClickCheckbox = (idTask: string) => {
    setTaskItems(
      taskItems.map(item => {
        return item.title === idTask
          ? { ...item, isChecked: !item.isChecked }
          : item
      }),
    )
  }

  const hanldeClearAllSelectedTasks = () => {
    const newTaskList = taskItems.filter(item => item.isChecked === false)
    setTaskItems(newTaskList)
  }

  return (
    <View style={styles.container}>
      <Header handleAddTask={handleAddTask} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.inputTitle}
          placeholder={'Task title'}
          value={task.title}
          onChangeText={text => setTask({ ...task, title: text })}
        />
        <TextInput
          style={styles.inputDescription}
          placeholder={'Task description'}
          value={task.description}
          onChangeText={text => setTask({ ...task, description: text })}
        />
      </KeyboardAvoidingView>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        {/* Tasks list */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <View key={index}>
                  <Task
                    task={item}
                    handleClickCheckbox={() => handleClickCheckbox(item.title)}
                  />
                </View>
              )
            })}
          </View>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={hanldeClearAllSelectedTasks}>
            <Text style={styles.clearButtonText}>CLEAR ALL TASKS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  clearButton: {
    alignItems: 'center',
  },
  clearButtonText: {
    alignItems: 'center',
    color: Color.Pink,
    fontWeight: 'bold',
    margin: 20,
  },
  container: {
    backgroundColor: Color.LightGrey,
    flex: 1,
  },
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
  items: {
    marginTop: 30,
  },
  scrollView: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tasksWrapper: {},
  writeTaskWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
})
