import React from 'react'
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native'
import ButtonRadius from './../../Components/ButtomRadius/ButtonRadius'

const fullHeight = Dimensions.get('window').height

const logo = require('./../../assets/images/logo.png')
// const google = require('./../../assets/images/google.png')
// const fb = require('./../../assets/images/fb.png')

type WelcomeProps = {
  navigation: any
}

const Welcome = ({ navigation }: WelcomeProps) => {
  // const navigation = props.navigation

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
            {/* <View>
              <Text style={styles.loginHeader}>Zaloguj się przez</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.googleLogoContainer}
                  onPress={() => navigation.navigate('GoogleLogin')}
                >
                  <Image
                    style={styles.googleLogo}
                    source={google}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Text style={styles.orText}>lub</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.fbLogo}
                    source={fb}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View> */}

            <ButtonRadius
              text="Zaczynajmy"
              backgroundColor="#5c8d89"
              textColor="#fff"
              action={() => navigation.navigate('ScanBarcode')}
            />
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
  loginHeader: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
  },
  googleLogoContainer: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  googleLogo: {
    width: 30,
    height: 30,
  },
  fbLogo: {
    width: 50,
    height: 50,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
  },
  orText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
})

export default Welcome
