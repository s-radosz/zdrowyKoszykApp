import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import Welcome from '../Screen/Welcome/Welcome'
import Scan from '../Screen/Scan/Scan'
import ProductDetails from './../Screen/ProductDetails/ProductDetails'
import ProductOrIngredientsNotFound from './../Screen/ProductOrIngredientsNotFound/ProductOrIngredientsNotFound'
import { GlobalContext } from './../Context/GlobalContext'
import NavigationService from './NavigationService'
import Alert from './../Components/Alert/Alert'

import { createStackNavigator } from 'react-navigation-stack'

const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
    },
    Scan: {
      screen: Scan,
      navigationOptions: {
        header: null,
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: {
        header: null,
      },
    },
    ProductOrIngredientsNotFound: {
      screen: ProductOrIngredientsNotFound,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
  },
)

const AppContainer = createAppContainer(MainStack)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      alertMessage: '',
      alertType: '',
      API_URL: 'http://zdrowy-koszyk.live/api/',
      showLoader: false,
      authorWebsite: 'https://tech-bulb.com/',
    }
  }
  setShowLoader = param => {
    this.setState({
      showLoader: param,
    })
  }

  setAlert = (showAlert, alertType, alertMessage) => {
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
      showAlert,
      alertType,
      alertMessage,
      API_URL,
      showLoader,
      authorWebsite,
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
          NavigationService: NavigationService,
          authorWebsite: authorWebsite,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}
        >
          {showAlert && (
            <Alert
              alertType={alertType}
              alertMessage={alertMessage}
              closeAlert={() => this.closeAlert()}
            />
          )}
          <AppContainer
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
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
