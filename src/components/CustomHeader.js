import {View, Text, Image} from 'react-native';
import React from 'react';

const CustomHeader = () => {
  return (
    <View className="ml-2 relative">
      <Image className="w-6 h-6" source={require('../assets/appLogo2.png')} />
    </View>
  );
};

export default CustomHeader;
