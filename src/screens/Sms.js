import React, {useEffect, useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import ChatCard from '../components/ChatCard';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Sms = () => {
  const [smsMessages, setSmsMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const checkAndRequestSmsPermission = async () => {
    const smsPermissionStatus = await request(PERMISSIONS.ANDROID.READ_SMS);

    if (smsPermissionStatus === RESULTS.GRANTED) {
      // Permission granted, fetch SMS messages
      listSmsMessages();
    } else if (smsPermissionStatus === RESULTS.DENIED) {
      console.log('SMS permission denied');
      // Handle permission denial and don't enter the loading state
      setShowPermissionButton(true);
    }
  };

  const listSmsMessages = () => {
    const filter = {
      box: 'inbox',
      maxCount: 1550,
    };

    setLoading(true); // Set loading to true while fetching data

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
        setLoading(false); // Handle loading state on error
      },
      (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        const arr = JSON.parse(smsList);

        // Update the state with the SMS messages and handle loading state
        setSmsMessages(arr);
        setLoading(false); // Set loading to false when data is loaded
      },
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkAndRequestSmsPermission();
    setRefreshing(false);
  };

  const requestPermissionAgain = async () => {
    console.log('called');
    const smsPermissionStatus = await request(PERMISSIONS.ANDROID.READ_SMS);
    checkAndRequestSmsPermission();
    if (smsPermissionStatus === RESULTS.GRANTED) {
      setShowPermissionButton(false);
      listSmsMessages();
    }
  };
  useEffect(() => {
    console.log(showPermissionButton);
    checkAndRequestSmsPermission();
  }, []);
  return (
    <View className="bg-white h-screen mx-5 mt-6 rounded-xl drop-shadow-xl">
      <View className="items-center">
        <Octicons name="horizontal-rule" size={30} color={'grey'} />
      </View>
      {showPermissionButton ? (
        <Button title="Allow Access" onPress={requestPermissionAgain} />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={smsMessages}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <ChatCard
              name={item.address}
              msg={item.body}
              id={item._id}
              dateTime={item.date}
            />
          )}
          initialNumToRender={50}
          maxToRenderPerBatch={30}
          ListFooterComponent={() => loading && <ActivityIndicator />}
        />
      )}
      <View className="h-14 my-16"></View>
    </View>
  );
};

export default Sms;
