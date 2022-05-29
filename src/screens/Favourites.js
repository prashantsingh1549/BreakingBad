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

import {removeFavourite} from '../redux/Action/BadAction';

const Favourites = ({navigation}) => {
  const dispatch = useDispatch();

  const {listOfBadCharacters, listOfBadFavourite} = useSelector(
    state => state.BadReducer,
  );
  const filterData = listOfBadCharacters.filter(item =>
    listOfBadFavourite.includes(item.char_id),
  );
  return (
    <View style={styles.container}>
      {filterData.length > 0 ? (
        <FlatList
          data={filterData}
          keyExtractor={item => item.char_id}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.flatConatiner}>
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
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <View style={styles.textContainer}>
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatConatiner: {
    marginHorizontal: 15,
    marginVertical: 30,
  },
  image: {
    width: 150,
    height: 180,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  textContainer: {
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
});
