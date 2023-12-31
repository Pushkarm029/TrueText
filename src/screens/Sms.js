import React, {useCallback, useEffect, useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
  Linking,
  ScrollView,
} from 'react-native';

import SmsAndroid from 'react-native-get-sms-android';
import ChatCard from '../components/ChatCard';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Sms = () => {
  const [smsMessages, setSmsMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const checkAndRequestSmsPermission = async () => {
    const smsPermissionStatus = await request(PERMISSIONS.ANDROID.READ_SMS);

    if (smsPermissionStatus === RESULTS.GRANTED) {
      setPermissionGranted(true);
      listSmsMessages();
    } else {
      setPermissionGranted(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAndRequestSmsPermission();
  }, []);

  const listSmsMessages = async () => {
    setLoading(true);
    const filter = {
      box: 'inbox',
      maxCount: 30,
    };
    try {
      const smsList = await new Promise((resolve, reject) => {
        SmsAndroid.list(
          JSON.stringify(filter),
          fail => {
            console.log('Failed with this error: ' + fail);
            reject(fail);
          },
          (count, smsList) => {
            console.log('Count: ', count);
            console.log('List: ', smsList);
            const arr = JSON.parse(smsList);
            resolve(arr);
          },
        );
      });

      const processedArray = await processingAndPostToBackend(smsList);
      setSmsMessages(processedArray);
      setLoading(false);
    } catch (error) {
      console.error('Error while listing SMS messages:', error);
    }
  };

  const processingAndPostToBackend = async arr => {
    const processedArray = [];

    for (const item of arr) {
      try {
        const response = await processToBackend({message: item.body});
        if (response == null) {
          console.error('No Internet Connection');
        } else if (response.ok) {
          const responseBody = await response.json();
          console.log('res from back', responseBody.result);
          if (responseBody.result == true) {
            item.spam = true;
          } else {
            item.spam = false;
          }

          processedArray.push(item);
          console.log(processedArray.result);
        } else {
          console.error('Error posting data:', response.statusText);
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }

    return processedArray;
  };

  const processToBackend = async userData => {
    try {
      const response = await fetch(
        'http://aiflask.ap-south-1.elasticbeanstalk.com/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );
      return response;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    checkAndRequestSmsPermission();
    setRefreshing(false);
    setLoading(false);
  };

  const openAppSettings = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  return (
    <>
      {!permissionGranted && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View className="h-screen bg-slate-800 flex">
            <View className="m-8 items-center justify-center h-[60%]">
              <Text className="text-lg p-3 text-gray-100"> Allow Access </Text>
              <Button title="Open App Settings" onPress={openAppSettings} />
              <Text className="text-md p-5 text-gray-200">
                {' '}
                Settings {'>'} TrueText {'> '}Permissions {'>'} SMS{' '}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
      {permissionGranted && (
        <View className="bg-white h-screen mx-5 mt-6 rounded-xl drop-shadow-xl">
          <View className="items-center">
            <Octicons name="horizontal-rule" size={30} color={'grey'} />
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={smsMessages}
            initialNumToRender={10}
            maxToRenderPerBatch={50}
            ListFooterComponent={() => loading && <ActivityIndicator />}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <ChatCard
                name={item.address}
                msg={item.body}
                id={item._id}
                dateTime={item.date}
                spam={item.spam} //response from backend
              />
            )}
          />
          <View className="h-14 my-16"></View>
        </View>
      )}
    </>
  );
};

export default Sms;
