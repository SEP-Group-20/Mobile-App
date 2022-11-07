import { Button, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from './components/Navbar';

export default function Home({ navigation }) {
  const scanQRCode = () => {
    navigation.navigate('Scan QR Code');
  };

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Navbar navigation={navigation}/>
        <View style={styles.body}>
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
  }
});
