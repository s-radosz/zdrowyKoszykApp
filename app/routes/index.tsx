import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import Welcome from '../Screen/Welcome/Welcome'
import ScanBarcode from '../Screen/ScanBarcode/ScanBarcode'
import ProductDetails from './../Screen/ProductDetails/ProductDetails'
import ProductNotFound from './../Screen/ProductNotFound/ProductNotFound'
import GoogleLogin from './../Screen/GoogleLogin/GoogleLogin'
// @ts-ignore
import { GlobalContext } from './../Context/GlobalContext'
import NavigationService from './NavigationService'
// import { ifIphoneX } from 'react-native-iphone-x-helper'

import { createStackNavigator } from 'react-navigation-stack'
import { API_URL as API_URL_ENV } from '../../.env.config'

const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    ScanBarcode: {
      screen: ScanBarcode,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProductNotFound: {
      screen: ProductNotFound,
      navigationOptions: {
        headerShown: false,
      },
    },
    GoogleLogin: {
      screen: GoogleLogin,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Welcome',
    // transitionConfig: () => fadeIn(),
    headerMode: 'none',
  },
)

const AppContainer = createAppContainer(MainStack)

export default class App extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      showAlert: false,
      alertMessage: '',
      alertType: '',
      API_URL: API_URL_ENV,
      showLoader: false,
    }
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

  componentDidMount = async () => {
    NavigationService.navigate('Welcome', {})
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
      // productDetails,
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
          NavigationService: NavigationService,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}
        >
          {/*<StatusBar backgroundColor="#f4a157" barStyle="light-content" />*/}
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
            // @ts-ignore
            alertType={alertType}
            alertMessage={alertMessage}
            closeAlert={this.closeAlert}
            showAlert={showAlert}
          />
        </SafeAreaView>
      </GlobalContext.Provider>
    )
  }
}
