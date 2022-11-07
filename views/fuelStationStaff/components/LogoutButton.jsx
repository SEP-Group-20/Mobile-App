import { Pressable, StyleSheet, Text } from 'react-native';

export default function LogoutButton({ navigation }) {
  const logout = () => {
    navigation.navigate('Home');
  };

  return (
    <Pressable android_ripple={{color: "#8B0000"}} onPress={logout}>
      <Text style={styles.logout}>Logout</Text>      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logout: {
    fontSize: 15,
    color: "white",
    margin: 8,
    paddingRight: 8
  }
});
