import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import {apiData} from './ApiEndPoint';
import {addBadFavourite, removeFavourite} from '../redux/Action/BadAction';

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const {listOfBadFavourite, searchData} = useSelector(
    state => state.BadReducer,
  );

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        data={searchData}
        keyExtractor={item => item.char_id}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{marginHorizontal: 15, marginVertical: 30}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {id: item.char_id})
              }>
              <Image
                source={{
                  uri: item.img,
                }}
                style={{
                  width: 150,
                  height: 180,
                  resizeMode: 'stretch',
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>
                  {item.name}
                </Text>
                <Text style={{color: '#FFFFFF', fontSize: 12}}>
                  {item.nickname}
                </Text>
              </View>
              {listOfBadFavourite.includes(item.char_id) ? (
                <TouchableOpacity
                  onPress={() => dispatch(removeFavourite(item.char_id))}>
                  <Image source={require('../assets/HEART_FILLED.png')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => dispatch(addBadFavourite(item.char_id))}>
                  <Image source={require('../assets/HEART.png')} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Search;
