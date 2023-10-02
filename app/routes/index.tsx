// import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import Welcome from '../Screen/Welcome/Welcome'
import ScanBarcode from '../Screen/ScanBarcode/ScanBarcode'
import ProductDetails from './../Screen/ProductDetails/ProductDetails'
import ProductNotFound from './../Screen/ProductNotFound/ProductNotFound'
import GoogleLogin from './../Screen/GoogleLogin/GoogleLogin'
// @ts-ignore
import { GlobalContext } from './../Context/GlobalContext'
// import NavigationService from './NavigationService'
// import { ifIphoneX } from 'react-native-iphone-x-helper'

// import { createStackNavigator } from 'react-navigation-stack'
import { API_URL as API_URL_ENV } from '../../.env.config'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// const MainStack = createStackNavigator(
//   {
//     Welcome: {
//       screen: Welcome,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     ScanBarcode: {
//       screen: ScanBarcode,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     ProductDetails: {
//       screen: ProductDetails,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     ProductNotFound: {
//       screen: ProductNotFound,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     GoogleLogin: {
//       screen: GoogleLogin,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//   },
//   {
//     initialRouteName: 'Welcome',
//     // transitionConfig: () => fadeIn(),
//     headerMode: 'none',
//   },
// )

// const AppContainer = createAppContainer(MainStack)

const Stack = createNativeStackNavigator()

export default class App extends Component {
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

  // componentDidMount = async () => {
  //   NavigationService.navigate('Welcome', {})
  // }

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
          // @ts-ignore
          // NavigationService: NavigationService,
          outOfContainerBackgroundColor: outOfContainerBackgroundColor,
          handleChangeOutOfContainerBackgroundColor:
            this.handleChangeOutOfContainerBackgroundColor,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            // backgroundColor: '#fff',
            backgroundColor: outOfContainerBackgroundColor,
          }}
        >
          {/*<StatusBar backgroundColor="#f4a157" barStyle="light-content" />*/}
          {/* <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
            // @ts-ignore
            alertType={alertType}
            alertMessage={alertMessage}
            closeAlert={this.closeAlert}
            showAlert={showAlert}
          /> */}

          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen
                name="ProductNotFound"
                component={ProductNotFound}
              />
              <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </GlobalContext.Provider>
    )
  }
}
