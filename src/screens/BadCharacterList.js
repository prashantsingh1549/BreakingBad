import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import {apiData} from './ApiEndPoint';
import {
  addBadFavourite,
  listBadCharacters,
  removeFavourite,
} from '../redux/Action/BadAction';

const BadCharacterList = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    handleBadCharacters();
  }, []);
  const handleBadCharacters = async () => {
    const data = await axios.get(apiData.baseUrl + apiData.charcters);
    dispatch(listBadCharacters(data.data));
  };
  const {listOfBadCharacters, listOfBadFavourite} = useSelector(
    state => state.BadReducer,
  );

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={'light-content'}
        showHideTransition={'slide'}
      />
      {listOfBadCharacters.length > 0 ? (
        <FlatList
          data={listOfBadCharacters}
          keyExtractor={item => item.char_id}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.flatConatiner}>
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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
};

export default BadCharacterList;

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
