import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LocalizedStrings from 'react-native-localization'

import { Color } from '../styles/Color'

interface Props {
  handleAddTask(): void
}

export const Header: React.FunctionComponent<Props> = ({ handleAddTask }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{strings.text}</Text>
    <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
      <Text style={styles.title}>+</Text>
    </TouchableOpacity>
  </View>
)

const strings = new LocalizedStrings({
  'en-US': {
    text: 'Todo',
  },
})

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Color.Blue,
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    paddingTop: 30,
    width: '100%',
  },
  title: {
    color: Color.White,
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
