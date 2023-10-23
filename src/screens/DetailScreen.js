import {View, Text} from 'react-native';
import React from 'react';

const formatDate = timestamp => {
  const date = new Date(parseInt(timestamp, 10));
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} at ${formattedTime}`;
};

const DetailScreen = ({route}) => {
  const {id, name, msg, dateTime, spam} = route.params;
  const bgColor = spam ? '#da2c38' : '#b3bfb8';
  const txtColor = spam ? '#fff' : '#1a1a1a';
  return (
    <View className="h-screen ">
      <View
        className="mx-auto my-auto h-fit p-3 m-6 rounded-lg"
        style={{backgroundColor: bgColor}}>
        <View>
          <Text className="text-lg p-1" style={{color: txtColor}}>
            From: {name}
          </Text>
          <Text className="text-sm p-1" style={{color: txtColor}}>
            Date: {formatDate(dateTime)}
          </Text>
        </View>

        <View className="mx-auto bg-slate-700 m-2 rounded-2xl ">
          <Text className="text-md text-white m-2 p-1">{msg}</Text>
        </View>
      </View>
      <View>
        {spam ? (
          <Text className=" mx-auto  font-bold text-2xl w-fit text-[#da2c38]">
            Caution!
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default DetailScreen;
