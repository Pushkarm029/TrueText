import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';

const NewsCardY = ({title, link, image_url}) => {
  const handlePress = () => {
    // Open the external link when the card is clicked.
    Linking.openURL(link); // Make sure to import Linking and request the necessary permissions to open URLs.
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="bg-black w-full my-2 mx-2">
        <Image
          source={
            image_url ? {uri: image_url} : require('../assets/DefaultNews.jpg')
          }
          className="h-40 w-full opacity-50"
        />

        <Text
          style={{textAlignVertical: 'center'}}
          className="text-white drop-shadow-xl p-7 mx-auto font-semibold left-0 w-42 absolute h-32 text-center">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCardY;
