import {View, Text, FlatList} from 'react-native';
import React from 'react';
import ChatCard from '../components/ChatCard';
import Octicons from 'react-native-vector-icons/Octicons';

const data = [
  {
    name: 'Ayush',
    id: 1,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 2,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 3,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 4,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 5,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 6,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 7,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 8,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 9,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 10,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 11,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 12,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 13,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 14,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 15,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 16,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 17,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 18,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 19,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 20,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 21,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 22,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 23,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 24,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 25,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 26,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 27,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 28,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Ayush',
    id: 29,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Pushkar',
    id: 30,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Dugar',
    id: 31,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
  {
    name: 'Sahil',
    id: 32,
    msg: 'Culpa proident magna aliquip sint duis cillum. Laborum fugiat ut',
  },
];

const Sms = () => {
  return (
    <View className="bg-white h-screen mx-5 mt-6 rounded-xl drop-shadow-xl ">
      <View className="absolute left-[45%] mx-auto top-0">
        <Octicons name="horizontal-rule" size={30} color={'#808080'} />
      </View>
      <View className="h-8 mt-4">
        <Text className="px-4 text-lg font-bold text-slate-800 ">
          Recent Text
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ChatCard name={item.name} msg={item.msg} id={item.id} />
        )}
      />
      <View className="h-14 my-16"></View>
    </View>
  );
};

export default Sms;
