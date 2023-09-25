import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

type ButtonRadiusProps = {
  text: string
  backgroundColor: string
  textColor: string
  action: any
}

const ButtonRadius = ({
  text,
  backgroundColor,
  textColor,
  action,
}: ButtonRadiusProps) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, { backgroundColor: backgroundColor }]}
      onPress={action}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 30,
    width: '65%',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
})

export default ButtonRadius
