import React from 'react';
import {View, Text} from 'react-native';

const LoadingAnimation = () => {
  return (
    <View className="bg-slate-800 my-2 mx-2 h-32 w-52 ">
      <Text
        style={{textAlignVertical: 'center'}}
        className="text-white drop-shadow-xl font-semibold left-0 w-52 absolute h-32 text-center py-auto">
        Loading...
      </Text>
    </View>
  );
};

export default LoadingAnimation;
