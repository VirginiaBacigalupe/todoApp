/* eslint-disable sort-keys */
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

import Header from './components/header'
import Task from './components/task'

interface Task {
  title: string
  description: string
  isChecked: boolean
}

export default function App() {
  const [task, setTask] = useState<Task>({
    description: '',
    title: '',
    isChecked: false,
  })
  const [taskItems, setTaskItems] = useState<Task[]>([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    if (task.description && task.title) {
      setTaskItems([...taskItems, task])
      setTask({ description: '', title: '', isChecked: false })
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
            onPress={() => hanldeClearAllSelectedTasks()}>
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
    color: 'rgb(255, 25, 123)',
    alignItems: 'center',
    margin: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'rgb(248, 248, 248)',
    flex: 1,
  },
  inputTitle: {
    backgroundColor: '#fff',
    borderBottomColor: 'rgb(255, 25, 123)',
    borderBottomWidth: 1,
    fontSize: 20,
    padding: 15,
    width: '100%',
  },
  inputDescription: {
    backgroundColor: '#fff',
    padding: 10,
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
