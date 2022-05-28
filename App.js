import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BadCharacterList from './src/screens/BadCharacterList';
import Search from './src/screens/Search';
import SearchHeader from './src/screens/SearchHeader';
import Favourites from './src/screens/Favourites';
import Details from './src/screens/Details';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BadCharacterList"
          component={BadCharacterList}
          options={({navigation, route}) => ({
            headerTitle: 'The Breaking Bad',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerRight: props => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <Image source={require('./src/assets/search1.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favourites')}
                  style={{marginLeft: 30}}>
                  <Image source={require('./src/assets/HEART_FILLED.png')} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({navigation, route}) => ({
            headerTitle: props => <SearchHeader />,
            headerStyle: {
              backgroundColor: '#242424',
            },
            headerBackVisible: false,
            headerTitleStyle: {
              color: '#fff',
            },
          })}
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={({navigation, route}) => ({
            headerStyle: {
              backgroundColor: '#000',
            },
            headerBackVisible: false,
            headerTitleStyle: {
              color: '#18CA75',
              fontSize: 25,
            },
            headerRight: props => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('./src/assets/crossClear.png')} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
