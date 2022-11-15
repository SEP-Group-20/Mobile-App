import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from "expo-barcode-scanner";
import Navbar from './components/Navbar';

const NIC_REGEX =
  /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;

function QRCodeScanner({ route, navigation }) {
  const [hasPermission, setHasPersmission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not set Scanned");

  if (route?.params?.registrationNumber === "")
    navigation.navigate('Login');

  const { registrationNumber } = route.params;

  const askCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPersmission(status === 'granted');
    })()
  }

  // ask camera permission when the app starts
  useEffect(() => {
    askCameraPermission();
  }, []);

  const handleScannedQRCode = ({data}) => {
    setScanned(true);
    if (NIC_REGEX.test(data)){
      setText(data);
      navigation.navigate('Record Fuel Sale', {
        userNIC: data,
        registrationNumber: registrationNumber
      });      
    }
    else {
      setText("Unrecognized QR code")
    }

  }

  // ask for permission
  if (hasPermission === null) {
    return (
      <>
        <StatusBar style='light'/>
        <View style={styles.appContainer}>
          <Navbar navigation={navigation}/>
          <View style={styles.body}>
            <Text style={styles.text}>Requesting Camera Permission...</Text>
          </View>
        </View>
      </>
    )
  }

  // whe permission is rejected provide button to ask for permission again
  if (hasPermission === false) {
    return (
      <>
        <StatusBar style='light'/>
        <View style={styles.appContainer}>
          <Navbar navigation={navigation}/>
          <View style={styles.body}>
            <Text style={styles.text}>No Access to Camera</Text>
            <Button color="#ff5722" style={styles.scanQRbutton} title='Allow camera' onPress={askCameraPermission}/>
          </View>
        </View>
      </>
    )
  }
  
  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Navbar navigation={navigation}/>
        <View style={styles.body}>
          <View style={styles.QRCodeBox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleScannedQRCode}
              style = {styles.QRCode}
            />
          </View>
          <Text style={styles.text}>{text}</Text>
          {scanned && <Button title="Scan Again?" onPress={() => setScanned(false)} color="#ff5722"/>}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  body: {
    flex: 1,
    backgroundColor: "#d1cebd",
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    margin: 20,
    fontSize: 24
  },
  QRCodeBox: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30
  },
  QRCode: {
    height: 600,
    width: 600
  }
});

export default QRCodeScanner;
