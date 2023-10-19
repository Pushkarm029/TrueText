import {View, Text} from 'react-native';
import React from 'react';

const formatDate = timestamp => {
  const date = new Date(parseInt(timestamp, 10));
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} at ${formattedTime}`;
};

const DetailScreen = ({route}) => {
  const {id, name, msg, dateTime} = route.params;
  return (
    <View className="h-screen ">
      <View className="mx-auto my-auto h-fit bg-slate-300 p-3 m-6 rounded-lg">
        <View>
          <Text className="text-lg text-slate-800 p-1">From: {name}</Text>
          <Text className="text-sm text-slate-800 p-1">
            Date: {formatDate(dateTime)}
          </Text>
        </View>

        <View className="mx-auto bg-slate-700 m-2 rounded-2xl ">
          <Text className="text-md text-white m-2 p-1">{msg}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;
