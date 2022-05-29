import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Details = ({navigation, ...props}) => {
  const {listOfBadCharacters, listOfBadFavourite} = useSelector(
    state => state.BadReducer,
  );
  const otherData = listOfBadCharacters.filter(
    item =>
      item.char_id > props.route.params.id &&
      item.char_id < props.route.params.id + 4,
  );
  const character = listOfBadCharacters.find(
    item => item.char_id == props.route.params.id,
  );
  const container = [{id: 1, data: character}];
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        data={container}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <ImageBackground
              resizeMode="stretch"
              source={{uri: item.data.img}}
              style={{
                height: windowHeight / 1.8,
                width: windowWidth,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginTop: 15,
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Image source={require('../assets/back.png')} />
                    <Image
                      style={{marginLeft: -5}}
                      source={require('../assets/backLeft.png')}
                    />
                  </TouchableOpacity>
                  {listOfBadFavourite.includes(item.data.char_id) ? (
                    <Image source={require('../assets/HEART_FILLED.png')} />
                  ) : (
                    <Image source={require('../assets/HEART.png')} />
                  )}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    shadowOffset: {width: -2, height: 4},
                    shadowColor: 'red',
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                  }}>
                  <Image
                    source={{uri: item.data.img}}
                    style={{
                      width: 160,
                      height: 200,
                      resizeMode: 'cover',
                      borderRadius: 5,
                      marginBottom: 30,
                    }}
                  />
                  <View style={{backgroundColor: '#000'}}>
                    <Text
                      style={{fontSize: 28, fontWeight: 'bold', color: '#fff'}}>
                      {item.data.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#fff',
                        alignSelf: 'center',
                      }}>
                      {item.data.nickname}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <View style={{marginTop: 30, marginLeft: 15}}>
              <View style={{marginVertical: 20}}>
                <Text style={{color: '#18CA75', fontWeight: 'bold'}}>
                  Potrayed
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 10,
                  }}>
                  <Text style={{color: '#fff', fontSize: 13}}>
                    {item.data.portrayed}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{color: '#fff', fontSize: 13, marginRight: 10}}>
                      {item.data.birthday}
                    </Text>
                    <Image source={require('../assets/gift.png')} />
                  </View>
                </View>
              </View>
              <View style={{marginVertical: 20}}>
                <Text style={{color: '#18CA75', fontWeight: 'bold'}}>
                  Occupation
                </Text>
                {item.data.occupation.map((item, index) => (
                  <Text key={index} style={{color: '#fff', fontSize: 13}}>
                    {item}
                  </Text>
                ))}
              </View>
              <View style={{marginVertical: 20}}>
                <Text style={{color: '#18CA75', fontWeight: 'bold'}}>
                  Appearance
                </Text>
                <FlatList
                  data={item.data.appearance}
                  horizontal={true}
                  keyExtractor={(item, index) => Math.random()}
                  renderItem={({item}) => (
                    <View
                      style={{
                        width: 70,
                        height: 20,
                        borderRadius: 5,
                        backgroundColor: '#242424',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 5,
                        marginTop: 5,
                      }}>
                      <Text style={{color: '#fff', fontSize: 12}}>
                        session {item}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{marginTop: 30, marginLeft: 15}}>
              <Text style={{fontSize: 26, color: '#fff'}}>
                Other Characters
              </Text>
              <FlatList
                data={otherData}
                keyExtractor={item => item.char_id}
                horizontal={true}
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
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>
                        {item.name}
                      </Text>
                      <Text style={{color: '#FFFFFF', fontSize: 12}}>
                        {item.nickname}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Details;
