import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import CheckboxActive from '../assets/iconCheckboxActive.png'
import CheckboxInactive from '../assets/iconCheckboxInactive.png'
import { TaskType } from '../index'
import { Color } from '../styles/Color'

interface Props {
  task: TaskType
  handleClickCheckbox(): void
}

export const Task: React.FunctionComponent<Props> = ({
  task: { title, description, isChecked },
  handleClickCheckbox,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDescription}>{description}</Text>
      </View>
      <TouchableOpacity onPress={handleClickCheckbox}>
        <Image
          style={styles.checkbox}
          source={isChecked ? CheckboxActive : CheckboxInactive}></Image>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {},
  item: {
    alignItems: 'center',
    backgroundColor: Color.White,
    borderColor: Color.MidGrey,
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
    color: Color.Grey,
    fontSize: 14,
  },
  taskTitle: { color: Color.Black, fontSize: 18 },
})
