import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';

const MsgCheck = () => {
  const [inputText, setInputText] = useState('');
  const [ValidateResponse, setValidateResponse] = useState('Neutral');
  const [bgColor, setbgColor] = useState('#515a47');

  const handleButtonPress = async () => {
    if (inputText === '') {
      setValidateResponse('Neutral');
      setbgColor('#515a47');
      return;
    }
    try {
      const response = await processToBackend(inputText);
      if (response) {
        const responseData = await response.json();
        console.log('Response from the backend:', responseData);
        if (responseData.result === false) {
          console.log(false);
          setValidateResponse('Safe :)');
          setbgColor('#155d27');
        }
        if (responseData.result === true) {
          setValidateResponse('Danger!');
          setbgColor('#f41b2d');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const processToBackend = async userData => {
    console.log(userData);
    try {
      const response = await fetch(
        'http://aiflask.ap-south-1.elasticbeanstalk.com/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({message: userData}),
        },
      );
      return response;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
  };

  return (
    <View className="h-screen">
      <View className="m-2 p-2">
        <Text className="text-lg font-semibold p-1 text-slate-800">
          Enter Your Message{' '}
        </Text>
        <TextInput
          placeholder="Paste your text here"
          multiline={true}
          numberOfLines={9}
          onChangeText={text => setInputText(text)}
          value={inputText}
          className="text-start border border-slate-400 text-slate-800 bg-slate-300 p-1"
          style={{textAlignVertical: 'top'}}
        />
        <View className="m-2 w-40 px-3 text-center mx-auto">
          <TouchableOpacity
            onPress={handleButtonPress}
            className=" bg-[#0096FF] rounded-xl text-center p-3 ">
            <Text className="text-xl text-gray-100 text-center my-auto">
              {' '}
              Validate
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className=" mt-5 flex flex-row w-full justify-center rounded-xl p-2 "
          style={{backgroundColor: bgColor}}>
          <Text className=" font-bold text-2xl w-fit text-slate-200 ">
            Status :{' '}
          </Text>
          <Text className="  font-bold text-2xl w-fit text-slate-200 ">
            {' '}
            {ValidateResponse}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MsgCheck;
