import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import img1 from '../assets/dummyNews1.png';
import img2 from '../assets/dummyNews2.png';
import NewsCardX from '../components/NewsCardX';
import NewsCardY from '../components/NewsCardY';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const News = () => {
  const newsData = [
    {
      headline: 'scam 1 alert',
      id: '1',
      content:
        'Laborum incididunt ex adipisicing et tempor ut cillum id. Minim qui sint tempor enim exercitation velit et commodo est. Commodo elit nostrud aliqua qui cillum ullamco officia aute irure. Pariatur mollit Lorem tempor eu non aute sint proident ipsum labore. Magna consectetur minim qui deserunt enim minim aute sint aliquip deserunt consequat deserunt id ullamco. Est nostrud eu pariatur nulla.',
      urlToImage: {img1},
    },
    {
      headline: 'scam 2 alert',
      id: '2',
      content:
        'Laborum incididunt ex adipisicing et tempor ut cillum id. Minim qui sint tempor enim exercitation velit et commodo est. Commodo elit nostrud aliqua qui cillum ullamco officia aute irure. Pariatur mollit Lorem tempor eu non aute sint proident ipsum labore. Magna consectetur minim qui deserunt enim minim aute sint aliquip deserunt consequat deserunt id ullamco. Est nostrud eu pariatur nulla.',
      urlToImage: {img2},
    },
  ];
  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex flex-row m-2">
          <Text className="text-xl  font-bold text-blue-800">Trending</Text>
          <View className="justify-end pb-[1px] pl-[1px]">
            <FontAwesome5 name="fire" size={20} color={'#1434A4'} />
          </View>
        </View>
        <ScrollView horizontal={true} className="m-1">
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView>
        <Text className="text-xl font-bold text-red-800 m-2">Scams!</Text>
        <ScrollView horizontal={true} className="m-1">
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
          <NewsCardX />
        </ScrollView>
      </SafeAreaView>

      <Text className="text-lg font-bold text-blue-800 mx-2"> Latest </Text>
      <View className="flex flex-row flex-wrap mx-2">
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
        <NewsCardY />
      </View>
    </ScrollView>
  );
};

export default News;
