import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from '../Screen/SearchScreen';
import AlbumScreen from '../Screen/AlbumScreen';
import ArtistScreen from '../Screen/ArtistScreen';
import Header from './TopBar/Header';

const MusicExplorerStack = createStackNavigator();

export default () => (
	<MusicExplorerStack.Navigator>
		<MusicExplorerStack.Screen options={{ headerShown: false }} name="Search" component={SearchScreen} />
		<MusicExplorerStack.Screen options={{ header: Header }} name="Album" component={AlbumScreen} />
		<MusicExplorerStack.Screen options={{ header: Header }} name="Artist" component={ArtistScreen} />
	</MusicExplorerStack.Navigator>
);
