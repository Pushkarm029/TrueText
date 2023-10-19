import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';

const NewsCardX = ({title, link, image_url}) => {
  const handlePress = () => {
    // Open the external link when the card is clicked.
    Linking.openURL(link); // Make sure to import Linking and request the necessary permissions to open URLs.
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="bg-black my-2 mx-2">
        <Image source={{uri: image_url}} className="h-32 w-52 opacity-50" />
        <Text
          style={{textAlignVertical: 'center'}}
          className="text-white drop-shadow-xl font-semibold left-0 w-52 absolute h-32 text-center py-auto">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCardX;
