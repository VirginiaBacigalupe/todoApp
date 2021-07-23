import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { PinkButton } from '../../components/PinkButton'
import { Routes } from '../../routes/Routes'
import { useAppSelector } from '../../store/hooks'
import { cleanCkeckedTodos } from '../../store/slices/todoSlice'
import { strings } from '../../strings'
import { Color } from '../../styles/Color'
import { ListItem } from './ListItem'

export const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const taskItems = useAppSelector(state => state.todo.todoList)

  const hanldeClearAllSelectedTasks = () => {
    dispatch(cleanCkeckedTodos())
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

  return (
    <View style={styles.container}>
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
