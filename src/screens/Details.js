import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
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
    <View style={styles.container}>
      <FlatList
        data={container}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <ImageBackground
              resizeMode="stretch"
              source={{uri: item.data.img}}
              style={styles.imageBackground}>
              <View style={styles.inBackgroundImage}>
                <View style={styles.backImageContainer}>
                  <TouchableOpacity
                    style={styles.baackImage}
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
                <View style={styles.uperImageContainer}>
                  <Image source={{uri: item.data.img}} style={styles.image} />
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.data.name}</Text>
                    <Text style={styles.nickName}>{item.data.nickname}</Text>
                    <Text style={styles.status}>{item.data.status}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.secondContainer}>
              <View style={{marginVertical: 20}}>
                <Text style={styles.title}>Potrayed</Text>
                <View style={styles.value}>
                  <Text style={styles.portrayed}>{item.data.portrayed}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.birthday}>{item.data.birthday}</Text>
                    <Image source={require('../assets/gift.png')} />
                  </View>
                </View>
              </View>
              <View style={{marginVertical: 20}}>
                <Text style={styles.title}>Occupation</Text>
                {item.data.occupation.map((item, index) => (
                  <Text key={index} style={styles.portrayed}>
                    {item}
                  </Text>
                ))}
              </View>
              <View style={{marginVertical: 20}}>
                <Text style={styles.title}>Appearance</Text>
                <FlatList
                  data={item.data.appearance}
                  horizontal={true}
                  keyExtractor={(item, index) => Math.random()}
                  renderItem={({item}) => (
                    <View style={styles.appearanceContainer}>
                      <Text style={styles.portrayed}>session {item}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={styles.otherContainer}>
              <Text style={styles.other}>Other Characters</Text>
              <FlatList
                data={otherData}
                keyExtractor={item => item.char_id}
                horizontal={true}
                renderItem={({item}) => (
                  <View style={styles.otherFlatlist}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Details', {id: item.char_id})
                      }>
                      <Image
                        source={{
                          uri: item.img,
                        }}
                        style={styles.otherImage}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <Text style={styles.portrayed}>{item.name}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageBackground: {
    height: windowHeight / 1.8,
    width: windowWidth,
  },
  inBackgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  baackImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uperImageContainer: {
    alignItems: 'center',
    shadowOffset: {width: -2, height: 4},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: 140,
    height: 170,
    resizeMode: 'contain',
    borderRadius: 5,
    marginBottom: 30,
  },
  nameContainer: {
    backgroundColor: '#000',
    width: windowWidth,
    alignItems: 'center',
    opacity: 0.7,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  nickName: {
    fontSize: 13,
    color: '#fff',
    marginVertical: 5,
  },
  status: {
    fontSize: 15,
    color: '#CA184E',
    fontWeight: 'bold',
  },
  secondContainer: {
    marginTop: 30,
    marginLeft: 15,
  },
  title: {
    color: '#18CA75',
    fontWeight: 'bold',
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  portrayed: {
    color: '#fff',
    fontSize: 13,
  },
  birthday: {
    color: '#fff',
    fontSize: 13,
    marginRight: 10,
  },
  appearanceContainer: {
    width: 90,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
  },
  otherContainer: {
    marginTop: 30,
    marginLeft: 15,
  },
  other: {
    fontSize: 26,
    color: '#fff',
  },
  otherFlatlist: {
    marginHorizontal: 15,
    marginVertical: 30,
  },
  otherImage: {
    width: 150,
    height: 180,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
});
