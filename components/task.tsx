import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Task({
  task: { title, description, isChecked },
  handleClickCheckbox,
}: any) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDescription}>{description}</Text>
      </View>
      <TouchableOpacity onPress={handleClickCheckbox}>
        <Image
          style={styles.checkbox}
          source={
            isChecked
              ? require('../assets/iconCheckboxActive.png')
              : require('../assets/iconCheckboxInactive.png')
          }></Image>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {},
  item: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  itemLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  taskDescription: {
    color: 'rgb(149, 149, 149)',
    fontSize: 14,
  },
  taskTitle: { color: 'black', fontSize: 18 },
})
