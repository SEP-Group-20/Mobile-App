import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from './components/Navbar';

export default function Home({ route, navigation }) {

  const { registrationNumber } = route.params;

  const scanQRCode = () => {
    navigation.navigate('Scan QR Code', {
      registrationNumber: registrationNumber
    });
  };

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Navbar navigation={navigation}/>
        <View style={styles.body}>
          <Text style={styles.text}>
            Fuel Station: {registrationNumber}
          </Text>
          <Button color="#ff5722" style={styles.scanQRbutton} title='Scan QR Code' onPress={scanQRCode}/>
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
    fontSize: 20,
    marginBottom: 16
  },
});
