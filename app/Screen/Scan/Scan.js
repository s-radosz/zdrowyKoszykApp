import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import axios from 'axios'
import { GlobalContext } from './../../Context/GlobalContext'
import { NavigationEvents } from 'react-navigation'
import ButtonRadius from './../../Components/ButtomRadius/ButtonRadius'

const ScanBarcode = ({ navigation }) => {
  let cameraRef = null

  const [camera, setCamera] = useState({
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.auto,
  })
  const [allowScanBarcode, setAllowScanBarcode] = useState(true)
  const [scanText, setScanText] = useState(false);
  const [allowScanText, setAllowScanText] = useState(false)

  const context = useContext(GlobalContext)

  useEffect(() => {
    const { params } = navigation.state
    let barcode = params ? params.barcode : null
    let name = params ? params.name : null

    console.log(barcode, name)

    //in view with detect text disable camera and wait to push button
    if (barcode || name) {
      setAllowScanBarcode(false);
      setScanText(true)
    }
  }, [navigation.state])

  const searchProduct = barcode => {
    console.log(['link', `${context.API_URL}product/find/${barcode}`])
    axios
      .get(`${context.API_URL}product/find/${barcode}`)
      .then(res => {
        console.log(['rsp', res.data])

        if (res.data.status === 'OK' && res.data.result && res.data.result.details) {
          navigation.navigate('ProductDetails', {
            productDetails: res.data,
          })
        } else {
          navigation.navigate('Scan', {
            barcode: barcode,
            name: res.data &&
              res.data.result &&
              res.data.result.name ? res.data.result.name : null
          })
        }
      })
      .catch(err => {
        console.log(['err', err])
      })
  }

  const textRecognized = object => {
    const { textBlocks } = object;

    //this.setState({ textBlocks });

    let details = "";
    let foundHeaderId = 0;

    textBlocks && textBlocks.length > 0 && textBlocks.map((block, i) => {
      //console.log(["block", block.value, i])

      if (block.value && (
        block.value.includes("Sktadniki:") ||
        block.value.includes("Skład:") ||
        block.value.includes("Składniki:") ||
        block.value.includes("Stlad:")
      )) {
        //console.log(["text", block.value])
        console.log("skladniki", i, foundHeaderId, block.value)

        details.concat(block.value)
        foundHeaderId = i + 1;

      } else if (foundHeaderId !== 0 && i === foundHeaderId) {
        console.log("i", i, foundHeaderId, block.value)
        setAllowScanText(false);

        const { params } = navigation.state
        let barcode = params ? params.barcode : null
        let name = params ? params.name : null

        navigation.navigate('ProductOrIngredientsNotFound', {
          barcode: barcode,
          name: name,
          details: details.concat(block.value)
        })
      }
    })
  };

  const handleBarcodeScan = scanResult => {
    if (scanResult.data != null) {
      setAllowScanBarcode(false)
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
      <NavigationEvents onDidFocus={() => {
        setAllowScanBarcode(true)
        setAllowScanText(false)
      }} />
      <RNCamera
        ref={ref => {
          cameraRef = ref
        }}
        defaultTouchToFocus
        flashMode={camera.flashMode}
        mirrorImage={false}
        onBarCodeRead={e => {
          if (allowScanBarcode) {
            handleBarcodeScan(e)
          }
        }}
        onFocusChanged={() => { }}
        onZoomChanged={() => { }}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }
        onTextRecognized={(e) => allowScanText ? textRecognized(e) : null}
        style={styles.preview}
        type={camera.type}
      />
      <View style={styles.maskOutter}>
        <View
          style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
        />
        <Text style={styles.descriptionText}>
          {scanText ?
            "Nakieruj kamera na sklad i kliknij przycisk" :
            "Nakieruj kamerą na kod kreskowy"}
        </Text>
        <View style={[{ flex: 30 }, styles.maskCenter]}>
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          <View style={styles.maskInner} />
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
        </View>
        <View
          style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
        />
        {scanText &&
          <ButtonRadius
            text="Skanuj sklad"
            backgroundColor="#5c8d89"
            textColor="#fff"
            action={() => setAllowScanText(true)}
          />
        }
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
