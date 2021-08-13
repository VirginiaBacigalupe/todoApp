/* eslint-disable react/display-name */
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'

import { Routes } from './routes/Routes'
import { Details } from './scenes/Details/index'
import { Home } from './scenes/Home'
import { NewTask } from './scenes/NewTask/index'
import { store } from './store'
import { strings } from './strings'
import { Color } from './styles/Color'

export interface TaskType {
  id: string
  title: string
  description: string
  completed: boolean
}

export type SettingsStackParamsList = {
  [Routes.Details]: { task: TaskType }
  [Routes.NewTask]: { task?: TaskType }
}

export const App = () => {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.Home}>
          <Stack.Screen
            name={Routes.Home}
            component={Home}
            options={() => ({
              headerStyle: styles.header,
              headerTintColor: Color.White,
              headerTitle: strings.initialHeaderTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name={Routes.NewTask}
            component={NewTask}
            options={() => ({
              headerStyle: styles.header,
              headerTintColor: Color.White,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name={Routes.Details}
            component={Details}
            options={() => ({
              headerStyle: styles.header,
              headerTintColor: Color.White,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.Blue,
  },
})
