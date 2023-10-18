import {View, Text} from 'react-native';
import React from 'react';

const formatDate = timestamp => {
  const date = new Date(parseInt(timestamp, 10));
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} ${formattedTime}`;
};

const DetailScreen = ({route}) => {
  const {id, name, msg, dateTime} = route.params;
  return (
    <View className="mx-auto my-auto h-fit bg-red-400 p-5 m-6 mb-32">
      <Text className="bg-slate-200 text-blue-700 p-6">
        {name} {id}
      </Text>
      <Text>{formatDate(dateTime)}</Text>
      <Text className="text-lg m-3 bg-fuchsia-800 text-white p-5">{msg}</Text>
    </View>
  );
};

export default DetailScreen;
