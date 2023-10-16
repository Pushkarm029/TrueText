import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import BottomTab from './src/components/BottomTab';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return <BottomTab />;
};

export default App;
