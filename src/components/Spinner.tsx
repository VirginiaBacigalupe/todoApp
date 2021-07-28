import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'

import { Color } from '../styles/Color'

interface Props {
  loading: boolean
}

export const Spinner: React.FunctionComponent<Props> = ({ loading }) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 10,
    display: 'flex',
    height: 100,
    justifyContent: 'space-around',
    width: 100,
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: Color.TransparentBlack,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
})
