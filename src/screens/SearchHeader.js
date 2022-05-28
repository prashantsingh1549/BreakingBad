import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const SearchHeader = () => {
  const [search, setSearch] = useState('');
  const [back, setBack] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {back ? (
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            setSearch('');
            setBack(false);
          }}>
          <Image source={require('../assets/back.png')} />
          <Image
            style={{marginLeft: -5}}
            source={require('../assets/backLeft.png')}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <TextInput
        value={search}
        placeholder="Search"
        placeholderTextColor={'grey'}
        onChangeText={val => setSearch(val)}
        onPressIn={() => setBack(true)}
        style={{fontSize: 25, width: 250, marginLeft: 40}}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/crossClear.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;
