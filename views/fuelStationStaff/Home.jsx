import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Fuel Token Issuer and Queue Management System</Text>
        <Button color="#d63447" title='Logout'/>
      </View>
      <View style={styles.body}>
        <Button color="#ff5722" style={styles.scanQRbutton} title='Scan QR Code'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#d63447",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    width: '60%',
    margin: 8
  },
  body: {
    flex: 1,
    backgroundColor: "#d1cebd",
    alignItems: 'center',
    justifyContent: 'center'
  }
});
