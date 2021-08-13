import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Color } from '../../styles/Color'

interface Props {
  title: string
  onPress(): void
}

export const PinkButton: React.FunctionComponent<Props> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.clearButton} onPress={onPress}>
      <Text style={styles.clearButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  clearButton: {
    alignItems: 'center',
  },
  clearButtonText: {
    alignItems: 'center',
    color: Color.Pink,
    fontWeight: 'bold',
    margin: 20,
  },
})
