import React, { useContext } from 'react'
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native'
import ButtonRadius from './../../Components/ButtomRadius/ButtonRadius'
import { GlobalContext } from './../../Context/GlobalContext'

const fullHeight = Dimensions.get('window').height

const logo = require('./../../Assets/images/logo.png')

const Welcome = props => {
  const navigation = props.navigation

  const context = useContext(GlobalContext)

  const handleLinkOpen = () => {
    Linking.openURL(
      context.authorWebsite
        ? context.authorWebsite
        : 'https://giphy.com/gifs/filmeditor-christmas-movies-macaulay-culkin-xUySTQZfdpSkIIg88M',
    ).catch(err => console.error("Couldn't load page", err))
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topWrapper}>
            <Image style={styles.logo} source={logo} resizeMode="contain" />
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>Darmowy skaner</Text>
              <Text style={styles.descriptionText}>składu produktów</Text>
            </View>
            <View style={styles.btnContainer}>
              <ButtonRadius
                text="Zaczynajmy"
                backgroundColor="#5c8d89"
                textColor="#fff"
                action={() => navigation.navigate('Scan')}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomShadow} />
          <View style={styles.bottomTextContainer}>
            <TouchableOpacity onPress={() => handleLinkOpen()}>
              <Text style={styles.bottomText}>Created by Radosz Szymon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: fullHeight,
  },
  topContainer: {
    height: '95%',
    width: '100%',
  },
  bottomContainer: {
    height: '15%',
    backgroundColor: '#74b49b',
    width: '100%',
  },
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f4f9f4',
  },
  bottomShadow: {
    backgroundColor: '#f4f9f4',
    height: 40,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  bottomTextContainer: {
    paddingTop: 20,
  },
  bottomText: {
    textAlign: 'center',
    padding: 0,
    margin: 0,
    fontSize: 14,
    lineHeight: 14,
    color: '#fff',
  },
  logo: {
    width: '50%',
    height: 100,
  },
  descriptionContainer: {
    marginTop: 50,
    marginBottom: 80,
  },
  descriptionText: {
    fontSize: 26,
    color: '#333',
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  orText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
})

export default Welcome
