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
const API_KEY_newsapi = '9b954e249b4c4717b68f72e8f14c4f15';

const News = () => {
  const [trendingNews, settrendingNews] = useState([]);
  const [scamNews, setscamNews] = useState([]);
  const [latestNews, setlatestNews] = useState([]);

  const fetchTrendNews = async () => {
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: API_KEY,
          q: 'trending',
          country: 'in',
          language: 'en',
          image: 1,
        },
      });
      settrendingNews(response.data.results);
      //  console.log(response.data.results[0].article_id);
    } catch (error) {
      console.log('err', error);
    }
  };
  const fetchScamNews = async () => {
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: API_KEY,
          q: 'online scam',
          country: 'in',
          language: 'en',
          image: 1,
        },
      });
      setscamNews(response.data.results);
      console.log(response.data.results[0].title, response.data.totalResults);
    } catch (error) {
      console.log('err', error);
    }
  };
  const fetchLatestNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          apikey: API_KEY_newsapi,
          country: 'in',
        },
      });
      setlatestNews(response.data.articles);
      console.log(
        'newsorg',
        response.data.articles[0].title,
        response.data.totalResults,
      );
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    fetchTrendNews();
    fetchScamNews();
    fetchLatestNews();
  }, []);

  //refresh on pull
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    fetchTrendNews();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaView>
        <View className="flex flex-row mx-2 mt-2">
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
        <Text className="text-xl font-bold text-red-800 mx-2">Scams!</Text>
        <FlatList
          className="m-1"
          horizontal={true}
          data={scamNews}
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
        <Text className="text-lg font-bold text-blue-800 mx-2"> Latest </Text>
        <FlatList
          className="m-1"
          data={latestNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <NewsCardY
              title={item.title}
              link={item.url}
              image_url={item.urlToImage}
            />
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default News;
