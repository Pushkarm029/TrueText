import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';

const MsgCheck = () => {
  const [inputText, setInputText] = useState('');

  const handleButtonPress = () => {
    processToBackend(inputText);
    console.log(inputText);
  };

  const processToBackend = async userData => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
  };

  return (
    <View className="m-2 p-2">
      <Text className="text-lg font-semibold p-1">Enter Your Message </Text>
      <TextInput
        placeholder="Paste your text here"
        multiline={true}
        numberOfLines={9}
        onChangeText={text => setInputText(text)}
        value={inputText}
        className="text-start border border-slate-400 bg-slate-300 p-1"
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
    </View>
  );
};

export default MsgCheck;
