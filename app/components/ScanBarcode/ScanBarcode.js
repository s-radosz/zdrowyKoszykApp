import React, { Component } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

class ScanBarcode extends Component {
    constructor(props) {
        super(props);

        this.camera = null;
        this.barcodeCodes = [];

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
            flashMode: RNCamera.Constants.FlashMode.auto,
              }
        }
    }

    onBarCodeRead(scanResult) {
        console.warn(scanResult.type);
        console.warn(scanResult.data);
        if (scanResult.data != null) {
            if (!this.barcodeCodes.includes(scanResult.data)) {
                this.barcodeCodes.push(scanResult.data);
                console.warn('onBarCodeRead call');
            }
        }
        return;
    }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

    render(){

    const { height, width } = Dimensions.get('window');
    const maskRowHeight = 50;
    const maskColWidth = (width - 300) / 2;

        return(
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    defaultTouchToFocus
                    flashMode={this.state.camera.flashMode}
                    mirrorImage={false}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    style={styles.preview}
                    type={this.state.camera.type}
                />
                    <View style={styles.maskOutter}>
                        <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
                        <Text style={styles.descriptionText}>Nakieruj kamerą na kod kreskowy</Text>
                        <View style={[{ flex: 30 }, styles.maskCenter]}>
                            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                            <View style={styles.maskInner} />
                            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                        </View>
                        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                    </View>
            </View>
        )
    }
}
export default ScanBarcode;

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold", 
        paddingBottom: 50, 
        backgroundColor: 'rgba(1,1,1,0.95)', 
        width: "100%", 
        textAlign: "center"
    }
})