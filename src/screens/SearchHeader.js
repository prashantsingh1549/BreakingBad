import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  StyleSheet,
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
  const handleSearch = async val => {
    setSearch(val);
    props.props.params = val;
    const data = await axios.get(apiData.baseUrl + apiData.search + val);
    dispatch(searchCharacter(data.data));
  };
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#242424"
        barStyle={'light-content'}
        showHideTransition={'slide'}
      />
      {back ? (
        <TouchableOpacity
          style={styles.backbutton}
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
        style={styles.searchInput}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backbutton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 25,
    width: 250,
    marginLeft: 40,
  },
});
