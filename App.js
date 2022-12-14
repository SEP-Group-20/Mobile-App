import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/fuelStationStaff/Home';
import QRCodeScanner from './views/fuelStationStaff/QRCodeScanner';
import RecordFuelSale from './views/fuelStationStaff/RecordFuelSale';
import Login from './views/login/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Scan QR Code" component={QRCodeScanner}/>
        <Stack.Screen name="Record Fuel Sale" component={RecordFuelSale}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
