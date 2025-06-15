import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import {SheetProvider} from 'react-native-actions-sheet';
import './sheets';
export default function App() {
  return (
    <SheetProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SheetProvider>
  );
}
