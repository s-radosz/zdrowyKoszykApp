import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

type ProductNotFoundProps = {
  navigation: any
}

const ProductNotFound = ({ navigation }: ProductNotFoundProps) => {
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
