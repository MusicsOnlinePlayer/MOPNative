import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from '../Screen/SearchScreen';
import AlbumScreen from '../Screen/AlbumScreen';
import ArtistScreen from '../Screen/ArtistScreen';

const MusicExplorerStack = createStackNavigator();

export default () => (
	<MusicExplorerStack.Navigator>
		<MusicExplorerStack.Screen options={{ headerShown: false }} name="Search" component={SearchScreen} />
		<MusicExplorerStack.Screen options={{ headerShown: false }} name="Album" component={AlbumScreen} />
		<MusicExplorerStack.Screen options={{ headerShown: false }} name="Artist" component={ArtistScreen} />
	</MusicExplorerStack.Navigator>
);
