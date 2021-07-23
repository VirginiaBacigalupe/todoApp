import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { TaskType } from '../..'
import { PinkButton } from '../../components/PinkButton'
import { Routes } from '../../routes/Routes'
import { Color } from '../../styles/Color'
import { Task } from './Task'

export const Home = () => {
  const navigation = useNavigation()
  const [taskItems, setTaskItems] = useState<TaskType[]>([])

  const handleAddTask = (task: TaskType) => {
    console.log('la task nueva que llega ', task)
    console.log('lista de task antes de meter la nueva ', taskItems)
    if (task.description && task.title) {
      setTaskItems(taskItems => [...taskItems, task])
    }
    console.log('lista de tasks dspues de meter la nueva ', taskItems)
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() =>
            navigation.navigate(Routes.NewTask, {
              addTask: handleAddTask,
            })
          }>
          <Text style={styles.headerTitle}>+</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={
          <Text style={styles.inputTitle}>The tasks list is empty</Text>
        }
        contentContainerStyle={{ flex: 1 }}
        style={styles.flatList}
        data={taskItems}
        keyExtractor={item => item.title}
        renderItem={task => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(Routes.Details, {
                handleClick: handleClickCheckbox(task.item.title),
                task: task.item,
              })
            }>
            <Task
              task={task.item}
              handleClickCheckbox={() => handleClickCheckbox(task.item.title)}
            />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <PinkButton
            title={'CLEAR ALL DONE'}
            onPress={hanldeClearAllSelectedTasks}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.LightGrey,
    flex: 1,
  },
  flatList: {
    flexGrow: 1,
  },
  headerTitle: {
    color: Color.White,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputTitle: {
    backgroundColor: Color.White,
    borderBottomColor: Color.Pink,
    borderBottomWidth: 1,
    fontSize: 20,
    padding: '5%',
    width: '100%',
  },
  rightButton: {
    color: Color.White,
    fontSize: 16,
    marginRight: 15,
  },
})
