import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { PinkButton } from '../../components/PinkButton'
import { Spinner } from '../../components/Spinner'
import { Routes } from '../../routes/Routes'
import { store } from '../../store'
import { useAppSelector } from '../../store/hooks'
import { deleteTodoItem, getTodoList } from '../../store/todos/actions'
import { strings } from '../../strings'
import { Color } from '../../styles/Color'
import { ListItem } from './ListItem'

export const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const taskItems = useAppSelector(state => state.todo.todoList)

  useEffect(() => {
    dispatch(getTodoList())
  }, [])

  const hanldeClearAllSelectedTasks = () => {
    const tasksToDelete = taskItems
      .filter(task => task.completed)
      .map(task => task.id)
    dispatch(deleteTodoItem(tasksToDelete))
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => navigation.navigate(Routes.NewTask)}>
          <Text style={styles.headerTitle}>+</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const isLoading = store.getState().todo.status === 'loading'

  return (
    <View style={styles.container}>
      <Spinner loading={isLoading} />
      <FlatList
        ListEmptyComponent={
          <Text style={styles.inputTitle}>{strings.emptyListText}</Text>
        }
        contentContainerStyle={{ flex: 1 }}
        style={styles.flatList}
        data={taskItems}
        keyExtractor={item => item.id}
        renderItem={elem => <ListItem task={elem.item} />}
        ListFooterComponent={
          <PinkButton
            title={strings.clearAllButton}
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
