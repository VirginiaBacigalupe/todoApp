import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import CheckboxActive from '../../icons/iconCheckboxActive.png'
import CheckboxInactive from '../../icons/iconCheckboxInactive.png'
import { TaskType } from '../../index'
import { Color } from '../../styles/Color'

interface Props {
  task: TaskType
  handleClickCheckbox(): void
}

export const Task: React.FunctionComponent<Props> = ({
  task: { title, description, isChecked },
  handleClickCheckbox,
}) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <Text style={styles.taskTitle}>{title}</Text>
      <Text
        style={styles.taskDescription}
        numberOfLines={1}
        ellipsizeMode="tail">
        {description}
      </Text>
    </View>
    <TouchableOpacity style={styles.itemRight} onPress={handleClickCheckbox}>
      <Image source={isChecked ? CheckboxActive : CheckboxInactive}></Image>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
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
    maxWidth: '80%',
  },
  itemRight: {
    marginRight: 10,
  },
  taskDescription: {
    color: Color.Grey,
    fontSize: 14,
    marginTop: 5,
  },
  taskTitle: { color: Color.Black, fontSize: 18 },
})
