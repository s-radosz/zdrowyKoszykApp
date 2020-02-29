import React from 'react'
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const fullHeight = Dimensions.get('window').height

const logo = require('./../../Assets/images/logo.png')

const Welcome = props => {
  const navigation = props.navigation

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
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => navigation.navigate('ScanBarcode')}
            >
              <Text style={styles.btnText}>Zaczynajmy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomShadow} />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Created by Radosz Szymon</Text>
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
    height: '85%',
    width: '100%',
  },
  bottomContainer: {
    height: '20%',
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
    backgroundColor: '#5c8d89',
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 30,
    width: '65%',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
})

export default Welcome
