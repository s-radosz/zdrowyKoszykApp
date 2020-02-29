import React, { useEffect, useState } from 'react'
import { Button, Text, View, StyleSheet, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import HTMLView from 'react-native-htmlview'

const ProductDetails = ({ navigation }) => {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const { params } = navigation.state
    const productDetails = params ? params.productDetails.result : null

    if (productDetails) {
      console.log(['Product details', productDetails])
      setName(productDetails.name ? productDetails.name : '')
      setDetails(productDetails.details ? productDetails.details : '')
      setIngredients(
        productDetails.ingredients && productDetails.ingredients.length > 0
          ? productDetails.ingredients
          : [],
      )

      //params.setScan(true);
    }
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      <Text>{name}</Text>
      <Text>{details}</Text>
      {ingredients &&
        ingredients.length > 0 &&
        ingredients.map((ingredient, i) => {
          return (
            <View>
              <Text style={{ color: ingredient.type === 'bad' && 'red' }}>
                {ingredient.name}
              </Text>
              <HTMLView value={ingredient.description} />
              <Text>{ingredient.wiki_title}</Text>
            </View>
          )
        })}
    </ScrollView>
  )
}
export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
