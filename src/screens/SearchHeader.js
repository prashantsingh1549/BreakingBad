import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch} from 'react-redux';

import {searchCharacter} from '../redux/Action/BadAction';
import {apiData} from './ApiEndPoint';

const SearchHeader = ({...props}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [back, setBack] = useState(false);
  const navigation = useNavigation();
  console.log(props);
  const handleSearch = async val => {
    setSearch(val);
    props.props.params = val;
    const data = await axios.get(apiData.baseUrl + apiData.search + val);
    dispatch(searchCharacter(data.data));
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <StatusBar
        animated={true}
        backgroundColor="#242424"
        barStyle={'light-content'}
        showHideTransition={'slide'}
      />
      {back ? (
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            setSearch('');
            setBack(false);
            dispatch(searchCharacter([]));
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
        onChangeText={val => handleSearch(val)}
        onPressIn={() => setBack(true)}
        style={{fontSize: 25, width: 250, marginLeft: 40}}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          dispatch(searchCharacter([]));
        }}>
        <Image source={require('../assets/crossClear.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;
