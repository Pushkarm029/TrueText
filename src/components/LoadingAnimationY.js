import React from 'react';
import {View, Text} from 'react-native';

const LoadingAnimationY = () => {
  return (
    <View className="bg-slate-800 my-2 mx-2 h-40 w-full ">
      <Text
        style={{textAlignVertical: 'center'}}
        className="text-white drop-shadow-xl font-semibold left-0 w-52 absolute h-32 text-center py-auto">
        Loading...
      </Text>
    </View>
  );
};

export default LoadingAnimationY;
