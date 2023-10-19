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
      setLoading(false); // Set loading to false when permission is not granted
    }
  };
  useEffect(() => {
    checkAndRequestSmsPermission();
  }, []);
  const listSmsMessages = () => {
    setLoading(true);
    const filter = {
      box: 'inbox',
      maxCount: 90,
    };
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        const arr = JSON.parse(smsList);
        setSmsMessages(arr);
        setLoading(false); // Set loading to false after fetching data
      },
    );
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
                Settings > TrueText > Permissions > SMS{' '}
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
            initialNumToRender={40}
            maxToRenderPerBatch={50}
            ListFooterComponent={() => loading && <ActivityIndicator />}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <ChatCard
                name={item.address}
                msg={item.body}
                id={item._id}
                dateTime={item.date}
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
