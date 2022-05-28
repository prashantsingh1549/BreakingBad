import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  addBadFavourite,
  listBadCharacters,
  removeFavourite,
} from '../redux/Action/BadAction';

const Favourites = ({navigation}) => {
  const dispatch = useDispatch();

  const {listOfBadCharacters, listOfBadFavourite} = useSelector(
    state => state.BadReducer,
  );
  const filterData = listOfBadCharacters.filter(item =>
    listOfBadFavourite.includes(item.char_id),
  );
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        data={filterData}
        keyExtractor={item => item.char_id}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{marginHorizontal: 15, marginVertical: 30}}>
            {listOfBadFavourite.includes(item.char_id) ? (
              <>
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
                  <TouchableOpacity
                    onPress={() => dispatch(removeFavourite(item.char_id))}>
                    <Image source={require('../assets/HEART_FILLED.png')} />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Favourites;
