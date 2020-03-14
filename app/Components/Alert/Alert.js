import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
const close = require('./../../Assets/images/closeWhite.png')
import { ifIphoneX } from 'react-native-iphone-x-helper'

const fullWidth = Dimensions.get('window').width

const Alert = props => {
  const [showAlert, setShowAlert] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (props.alertMessage) {
      setShowAlert(true)
      setMessage(props.alertMessage)
    }
  }, [props.alertMessage])

  if (showAlert) {
    return (
      <View style={styles.alertContainer}>
        <Text
          data-test="message"
          style={
            props.alertType == 'success'
              ? styles.successContainer
              : props.alertType == 'danger' && styles.dangerContainer
          }
        >
          {message}
        </Text>
        <TouchableHighlight
          onPress={props.closeAlert}
          style={styles.closeAlert}
          underlayColor={
            props.alertType == 'success'
              ? '#92d3a2'
              : props.alertType == 'danger' && '#cc7897'
          }
        >
          <Image source={close} style={{ width: 19, height: 19 }} />
        </TouchableHighlight>
      </View>
    )
  } else {
    return <View />
  }
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    zIndex: 100,
    width: fullWidth,
    top: 0,
    ...ifIphoneX(
      {
        paddingTop: 30,
      },
      {},
    ),
    justifyContent: 'center',
  },
  successContainer: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    width: fullWidth,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#92d3a2',
  },
  dangerContainer: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    width: fullWidth,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#cc7897',
  },
  closeAlert: {
    position: 'absolute',
    right: 10,
    ...ifIphoneX(
      {
        top: 42,
      },
      {},
    ),
  },
})
export default Alert
