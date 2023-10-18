import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const Profile = () => {
  const [smsMessages, setSmsMessages] = useState([]);

  useEffect(() => {
    listSmsMessages();
  }, []);

  const listSmsMessages = () => {
    const filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
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

        // Update the state with the SMS messages
        setSmsMessages(arr);
      },
    );
  };

  return (
    <View>
      <Text>Received SMS Messages:</Text>
      <FlatList
        data={smsMessages}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>From: {item.address}</Text>
            <Text>Message: {item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Profile;
