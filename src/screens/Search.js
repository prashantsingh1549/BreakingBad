import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {addBadFavourite, removeFavourite} from '../redux/Action/BadAction';

const Search = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const {listOfBadFavourite, searchData} = useSelector(
    state => state.BadReducer,
  );
  return (
    <View style={styles.container}>
      {searchData.length > 0 ? (
        <FlatList
          data={searchData}
          keyExtractor={item => item.char_id}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.flatListContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', {id: item.char_id})
                }>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={styles.searchImage}
                />
              </TouchableOpacity>
              <View style={styles.nameContainer}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.nickname}>{item.nickname}</Text>
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
      ) : (
        props.route.params && (
          <View style={styles.notFound}>
            <Text style={{color: '#18CA75', fontSize: 20}}>
              No Character found
            </Text>
            <Text style={{color: '#fff', fontSize: 20}}>Try again</Text>
          </View>
        )
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatListContainer: {
    marginHorizontal: 15,
    marginVertical: 30,
  },
  searchImage: {
    width: 150,
    height: 180,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nickname: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  notFound: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
});
