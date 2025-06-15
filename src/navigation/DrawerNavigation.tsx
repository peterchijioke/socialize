import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
export const DrawerNavigationName = 'DrawerNavigation';
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
