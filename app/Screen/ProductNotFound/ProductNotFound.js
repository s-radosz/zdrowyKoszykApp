import React, { useEffect } from 'react'
import { Button, Text, View, StyleSheet, Dimensions } from 'react-native'

const ProductNotFound = ({ navigation }) => {
  useEffect(() => {
    const { params } = navigation.state
    const barcode = params ? params.barcode : null

    if (barcode) {
      console.log(['Product barcode', barcode])
    }
  }, [navigation.state])

  return (
    <View style={styles.container}>
      <Text>PProductNotFound</Text>
    </View>
  )
}
export default ProductNotFound

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
