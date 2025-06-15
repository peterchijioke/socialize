import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation, {DrawerNavigationName} from './DrawerNavigation';

const Stack = createNativeStackNavigator();
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Stack.Screen name={DrawerNavigationName} component={DrawerNavigation} />
    </Stack.Navigator>
  );
}
