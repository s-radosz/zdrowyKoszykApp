import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import axios from 'axios'
import { GlobalContext } from './../../Context/GlobalContext'
import { NavigationEvents } from 'react-navigation'

const ScanBarcode = ({ navigation }) => {
  let cameraRef = null

  const [camera, setCamera] = useState({
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.auto,
  })
  const [scan, setScan] = useState(true)

  const context = useContext(GlobalContext)

  const searchProduct = barcode => {
    console.log(['link', `${context.API_URL}product/find/${barcode}`])
    axios
      .get(`${context.API_URL}product/find/${barcode}`)
      .then(res => {
        console.log(['rsp', res.data])

        if (res.data.status === 'OK' && res.data.result) {
          navigation.navigate('ProductDetails', {
            productDetails: res.data,
          })
        } else {
          console.log('PRODUCT NOT FOUND')
          navigation.navigate('ProductNotFound', {
            barcode: barcode,
          })
        }
      })
      .catch(err => {
        console.log(['err', err])
      })
  }

  const handleBarcodeScan = scanResult => {
    if (scanResult.data != null) {
      setScan(false)
      let barcode = scanResult.data
      console.warn(['scanned', scanResult.data])
      searchProduct(barcode)
    }
    return
  }
  const { height, width } = Dimensions.get('window')
  const maskRowHeight = 50
  const maskColWidth = (width - 300) / 2

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={() => setScan(true)} />
      <RNCamera
        ref={ref => {
          cameraRef = ref
        }}
        defaultTouchToFocus
        flashMode={camera.flashMode}
        mirrorImage={false}
        onBarCodeRead={e => {
          if (scan) {
            handleBarcodeScan(e)
          }
        }}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }
        style={styles.preview}
        type={camera.type}
      />
      <View style={styles.maskOutter}>
        <View
          style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
        />
        <Text style={styles.descriptionText}>
          Nakieruj kamerą na kod kreskowy
        </Text>
        <View style={[{ flex: 30 }, styles.maskCenter]}>
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          <View style={styles.maskInner} />
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
        </View>
        <View
          style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
        />
      </View>
    </View>
  )
}
export default ScanBarcode

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.95)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
  descriptionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 50,
    backgroundColor: 'rgba(1,1,1,0.95)',
    width: '100%',
    textAlign: 'center',
  },
})
