import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsCardX from '../components/NewsCardX';
import NewsCardY from '../components/NewsCardY';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const API_KEY = 'pub_31460f6837fbe6e5985d855312f8f03faf51b';

const News = () => {
  const [trendingNews, settrendingNews] = useState([]);

  const fetchNews = async category => {
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: API_KEY,
          q: category,
          country: 'in',
          language: 'en',
          image: 1,
        },
      });
      settrendingNews(response.data.results);
      console.log(response.data.results[0].article_id);
    } catch (error) {
      console.log('err', error);
    }
  };
  useEffect(() => {
    fetchNews('breaking');
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    fetchNews('breaking');
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaView>
        <View className="flex flex-row m-2">
          <Text className="text-xl  font-bold text-blue-800">Trending</Text>
          <View className="justify-end pb-[1px] pl-[1px]">
            <FontAwesome5 name="fire" size={20} color={'#1434A4'} />
          </View>
        </View>
        <FlatList
          className="m-1"
          horizontal={true}
          data={trendingNews}
          keyExtractor={item => item.article_id.toString()}
          renderItem={({item}) => (
            <NewsCardX
              title={item.title}
              link={item.link}
              image_url={item.image_url}
            />
          )}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Text className="text-xl font-bold text-red-800 m-2">Scams!</Text>
        <ScrollView horizontal={true} className="m-1"></ScrollView>
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
