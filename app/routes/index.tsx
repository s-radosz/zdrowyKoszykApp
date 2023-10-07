import React, { Component, Ref } from 'react'
import { SafeAreaView, Alert, Linking, BackHandler } from 'react-native'
import Welcome from '../Screen/Welcome/Welcome'
import ScanBarcode from '../Screen/ScanBarcode/ScanBarcode'
import ProductDetails from './../Screen/ProductDetails/ProductDetails'
import ProductNotFound from './../Screen/ProductNotFound/ProductNotFound'
import GoogleLogin from './../Screen/GoogleLogin/GoogleLogin'
// @ts-ignore
import { GlobalContext } from './../Context/GlobalContext'
import { API_URL as API_URL_ENV } from '../../.env.config'

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import VersionCheck from 'react-native-version-check'
import analytics from '@react-native-firebase/analytics'

const Stack = createNativeStackNavigator()

export default class App extends Component {
  navigationRef: Ref<NavigationContainerRef<RootParamList>> | undefined
  routeNameRef: any
  constructor(props: any) {
    super(props)
    this.state = {
      showAlert: false,
      alertMessage: '',
      alertType: '',
      API_URL: API_URL_ENV,
      showLoader: false,
      outOfContainerBackgroundColor: '#fff',
    }

    this.routeNameRef = React.createRef()
    this.navigationRef = React.createRef()
  }

  handleChangeOutOfContainerBackgroundColor = (backgroundColor: string) => {
    this.setState({
      outOfContainerBackgroundColor: backgroundColor,
    })
  }

  setShowLoader = (param: boolean) => {
    this.setState({
      showLoader: param,
    })
  }

  setAlert = (showAlert: boolean, alertType: string, alertMessage: string) => {
    this.setState({
      showAlert: showAlert,
      alertType: alertType,
      alertMessage: alertMessage,
    })
  }

  closeAlert = () => {
    this.setState({
      showAlert: false,
      alertType: '',
      alertMessage: '',
    })
  }

  checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck?.needUpdate()

      // console.log(['checkVersion', updateNeeded])

      if (updateNeeded && updateNeeded?.isNeeded) {
        Alert?.alert(
          'Dostępna Nowa Wersja',
          'Zaktualizuj aplikację, aby kontynuować',
          [
            {
              text: 'Zaktualizuj',
              onPress: () => {
                BackHandler?.exitApp()
                Linking?.openURL(updateNeeded?.storeUrl)
              },
            },
          ],
          {
            cancelable: false,
          },
        )
      }
    } catch (err) {}
  }

  componentDidMount = async () => {
    this?.checkVersion()
  }

  render() {
    const {
      // @ts-ignore
      showAlert,
      // @ts-ignore
      alertType,
      // @ts-ignore
      alertMessage,
      // @ts-ignore
      API_URL,
      // @ts-ignore
      showLoader,
      // @ts-ignore
      outOfContainerBackgroundColor,
    } = this.state

    return (
      <GlobalContext.Provider
        value={{
          showAlert: showAlert,
          alertType: alertType,
          alertMessage: alertMessage,
          setAlert: this.setAlert,
          API_URL: API_URL,
          showLoader: showLoader,
          setShowLoader: this.setShowLoader,
          closeAlert: this.closeAlert,
          outOfContainerBackgroundColor: outOfContainerBackgroundColor,
          handleChangeOutOfContainerBackgroundColor:
            this.handleChangeOutOfContainerBackgroundColor,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: outOfContainerBackgroundColor,
          }}
        >
          <NavigationContainer
            ref={this.navigationRef}
            onReady={() => {
              this.routeNameRef.current =
                this.navigationRef.current.getCurrentRoute().name
            }}
            onStateChange={async () => {
              const previousRouteName = this.routeNameRef.current
              const currentRouteName =
                this.navigationRef.current.getCurrentRoute().name

              if (previousRouteName !== currentRouteName) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                })
              }
              this.routeNameRef.current = currentRouteName
            }}
          >
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ animation: 'fade' }}
              />
              <Stack.Screen
                name="ScanBarcode"
                component={ScanBarcode}
                options={{ animation: 'fade' }}
              />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{ animation: 'fade' }}
              />
              <Stack.Screen
                name="ProductNotFound"
                component={ProductNotFound}
                options={{ animation: 'fade' }}
              />
              <Stack.Screen
                name="GoogleLogin"
                component={GoogleLogin}
                options={{ animation: 'fade' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </GlobalContext.Provider>
    )
  }
}
