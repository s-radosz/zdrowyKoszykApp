import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Header from './../../Components/Header/Header'
import ButtonRadius from './../../Components/ButtomRadius/ButtonRadius'
import { GlobalContext } from './../../Context/GlobalContext'
import axios from 'axios'

const ProductOrIngredientsNotFound = ({ navigation }) => {
  const [barcode, setBarcode] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')

  const context = useContext(GlobalContext)

  useEffect(() => {
    const { params } = navigation.state
    let barcode = params ? params.barcode : null
    let name = params ? params.name : null
    let details = params ? params.details : null

    console.log(barcode, name, details)

    setBarcode(barcode)
    setName(name)
    setDetails(details)
  }, [navigation.state])

  const sendToVerification = () => {
    console.log(barcode, name, details)

    if (name && barcode && details) {
      axios
        .post(`${context.API_URL}product-to-accept/new`, {
          name: name,
          barcode: barcode,
          details: details,
        })
        .then(res => {
          console.log(['rsp', res.data])

          context.setAlert(
            true,
            'success',
            'Produkt został wysłany do weryfikacji.',
          )

          navigation.navigate('Welcome', {})
        })
        .catch(err => {
          console.log(['err', err])
        })
    } else {
      context.setAlert(true, 'danger', 'Wszystkie pola są wymagane.')
    }
  }

  return (
    <View style={styles.container}>
      <Header name={`Edytuj i wyślij dane dla kodu - ${barcode}`} />

      <View style={styles.contextContainer}>
        <TextInput
          multiline={true}
          numberOfLines={2}
          style={[styles.nameInput, styles.input]}
          onChangeText={text => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          placeholder="Wpisz nazwę produktu *"
          placeholderTextColor="grey"
        />

        <TextInput
          multiline={true}
          numberOfLines={6}
          style={[styles.input, styles.textArea]}
          onChangeText={text => setDetails(text)}
          value={details}
          underlineColorAndroid="transparent"
          placeholder="Wpisz skład produktu *"
          placeholderTextColor="grey"
        />

        <ButtonRadius
          text="Wyślij"
          backgroundColor="#5c8d89"
          textColor="#fff"
          action={() => sendToVerification()}
        />
      </View>
    </View>
  )
}
export default ProductOrIngredientsNotFound

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nameInput: {
    height: 80,
  },
  textArea: {
    height: 250,
    textAlignVertical: 'top',
  },
  contextContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
  },
})
