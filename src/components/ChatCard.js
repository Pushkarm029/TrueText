import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
const ChatCard = ({name, msg, id, dateTime, spam}) => {
  //first letter of the name for the profile picture
  const firstCharacterIsAlphabet = /^[A-Za-z]/.test(name.charAt(0));
  const profilePicture = firstCharacterIsAlphabet ? name.charAt(0) : spam ? '!' : '?';

  const DateOrTime = timestamp => {
    const messageDate = new Date(parseInt(timestamp, 10));
    const currentDate = new Date();
    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Message was received today, display time in "HH:mm" format
      return `${String(messageDate.getHours()).padStart(2, '0')}:${String(
        messageDate.getMinutes(),
      ).padStart(2, '0')}`;
    } else {
      // Message was not received today, display date in "MMM dd" format
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

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
    else if(char == '!'){
      return '#FF0808'
    }
    return '#50AD14';
  }
  //   Profile pic random color
  const backgroundColor = spam ? getAlphabeticColor(profilePicture.toLowerCase()) : "red";

  // first 55 characters in msgs
  const truncatedMsg = msg.length > 55 ? msg.slice(0, 55) + '...' : msg;
  const navigation = useNavigation();

  const handlePress = id => {
    navigation.navigate('Detail', {
      id: id,
      name: name,
      msg: msg,
      dateTime: dateTime,
      spam: spam
    });
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
        <View className="flex flex-row justify-between">
          <Text className="text-[16px] font-semibold text-slate-600 ">
            {name}
          </Text>
          <Text className=" absolute left-[81%] bottom-0 text-slate-600 text-[11px] ">
            {DateOrTime(dateTime)}
          </Text>
        </View>
        <Text className="text-[14px] text-[#666] ">{truncatedMsg}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
