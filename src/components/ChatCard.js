import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
const ChatCard = ({name, msg, id}) => {
  //first letter of the name for the profile picture
  const profilePicture = name.charAt(0);

  function getAlphabeticColor(char) {
    // fixed colors for alphabets
    const colors = {
      a: '#ffd6ff',
      b: '#6a994e',
      c: '#90e0ef',
      d: '#9a8c98',
      e: '#b5838d',
      f: '#f8ad9d',
      g: '#bbd0ff',
      h: '#83c5be',
      i: '#a9d6e5',
      j: '#a9def9',
      k: '#feeafa',
      l: '#f9c74f',
      m: '#ace894',
      n: '#52b69a',
      o: '#1e6091',
      p: '#60d394',
      q: '#b392ac',
      r: '#bff1f1',
      s: '#ffc15e',
      t: '#ef7674',
      u: '#f79824',
      v: '#90dbf4',
      w: '#f1c0e8',
      x: '#f4845f',
      y: '#52b788',
      z: '#2d6a4f',
    };
    if (char in colors) {
      return colors[char];
    }
    return '#d90429';
  }
  //   Profile pic random color
  const backgroundColor = getAlphabeticColor(profilePicture.toLowerCase());

  // first 55 characters in msgs
  const truncatedMsg = msg.length > 55 ? msg.slice(0, 55) + '...' : msg;
  const navigation = useNavigation();

  const handlePress = id => {
    navigation.navigate('Detail', {id: id, name: name, msg: msg});
  };
  return (
    <TouchableOpacity
      onPress={() => handlePress(id)}
      className="flex flex-row align-middle p-1 m-2 bg-white"
      activeOpacity={0.1}>
      <View
        style={{backgroundColor}}
        className="w-[50px] h-[50px] rounded-full justify-center items-center ">
        <Text className="text-white text-[20px]">{profilePicture}</Text>
      </View>
      <View className="ml-[10px] flex-1">
        <Text className="text-[16px] font-semibold text-slate-600 ">
          {name} {id}
        </Text>
        <Text className="text-[14px] text-[#666] ">{truncatedMsg}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
