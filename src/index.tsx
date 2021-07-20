/* eslint-disable react/display-name */
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import LocalizedStrings from 'react-native-localization'

import { Routes } from './routes/Routes'
import { Details } from './scenes/Details'
import { Home } from './scenes/Home'
import { NewTask } from './scenes/NewTask'
import { Color } from './styles/Color'

export interface TaskType {
  title: string
  description: string
  isChecked: boolean
}

export type SettingsStackParamsList = {
  [Routes.Details]: { task: TaskType; handleClick: () => void }
  [Routes.NewTask]: { addTask: (task: TaskType) => void }
}

export const App = () => {
  const Stack = createStackNavigator()
  const strings = new LocalizedStrings({
    'en-US': {
      text: 'Todo',
    },
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Home}>
        <Stack.Screen
          name={Routes.Home}
          component={Home}
          options={() => ({
            headerStyle: styles.header,
            headerTintColor: Color.White,
            headerTitle: strings.text,
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
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.Blue,
  },
})
