import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Header({ handleAddTask }: any) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Todo</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          handleAddTask()
        }}>
        <Text style={styles.title}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'rgb(31, 134, 255)',
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    paddingTop: 30,
    width: '100%',
  },
  title: {
    color: '#fff',
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
