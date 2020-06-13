import React from 'react';
import Axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './Navigator/Home';
import RootReducer from './Reducers/RootReducer';
import ArtistScreen from './Screen/ArtistScreen';
import AlbumScreen from './Screen/AlbumScreen';


const store = createStore(
	RootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
		&& window.__REDUX_DEVTOOLS_EXTENSION__(),
);

Axios.defaults.withCredentials = true;

const RootStack = createStackNavigator();

export default () => (
	<Provider store={store}>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.dark}>
			<NavigationContainer>
				<RootStack.Navigator>
					<RootStack.Screen options={{ headerShown: false }} name="Main" component={HomeNavigator} />
					<RootStack.Screen options={{ headerShown: false }} name="Artist" component={ArtistScreen} />
					<RootStack.Screen options={{ headerShown: false }} name="Album" component={AlbumScreen} />
				</RootStack.Navigator>
			</NavigationContainer>
		</ApplicationProvider>
	</Provider>
);
