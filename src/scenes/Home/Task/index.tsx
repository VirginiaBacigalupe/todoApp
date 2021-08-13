import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import CheckboxActive from '../../../icons/iconCheckboxActive.png'
import CheckboxInactive from '../../../icons/iconCheckboxInactive.png'
import { TaskType } from '../../../index'
import { Color } from '../../../styles/Color'

interface Props {
  task: TaskType
  handleClickCheckbox(): void
}

export const Task: React.FunctionComponent<Props> = ({
  task: { title, description, completed },
  handleClickCheckbox,
}) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <Text data-testid="task-title" style={styles.taskTitle}>
        {title}
      </Text>
      <Text
        data-testid="task-description"
        style={styles.taskDescription}
        numberOfLines={1}
        ellipsizeMode="tail">
        {description}
      </Text>
    </View>
    <TouchableOpacity
      data-testid="checkbox"
      style={styles.itemRight}
      onPress={handleClickCheckbox}>
      <Image
        data-testid="checkbox-image"
        source={completed ? CheckboxActive : CheckboxInactive}></Image>
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
