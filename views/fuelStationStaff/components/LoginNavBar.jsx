import { StyleSheet, Text, View } from 'react-native';

export default function LoginNavbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarTitle}>Fuel Token Issuer and Queue Management System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#d63447",
    paddingTop: 30
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    margin: 8
  }
});
