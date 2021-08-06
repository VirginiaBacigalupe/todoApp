import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'

import { addTodoItem } from '../../store/todos/actions'
import { strings } from '../../strings'

export const useHandleAddTask = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return {
    handleAddTask: (description: string, title: string) => {
      if (description && title) {
        const task = { description, title }
        dispatch(addTodoItem(task))
        navigation.goBack()
      } else if (!title && !description) {
        Alert.alert(strings.invalidTitleAndDescriptionError)
      } else if (!title) {
        Alert.alert(strings.invalidTitleError)
      } else {
        Alert.alert(strings.invalidDescriptionError)
      }
    },
  }
}
