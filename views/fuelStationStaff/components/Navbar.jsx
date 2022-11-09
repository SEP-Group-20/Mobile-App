import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Navbar({ navigation }) {
  const logout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarTitle}>Fuel Token Issuer and Queue Management System</Text>
      <Pressable android_ripple={{color: "#8B0000"}} onPress={logout}>
      <Text style={styles.logout}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#d63447",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingTop: 30
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    width: '60%',
    margin: 8
  },
  logout: {
      fontSize: 15,
      color: "white",
      margin: 8,
      paddingRight: 8
  }
});
