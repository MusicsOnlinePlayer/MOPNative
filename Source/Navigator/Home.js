import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from '@ui-kitten/components';
import { SearchScreen } from '../Screen/SearchScreen';
import { AccountScreen } from '../Screen/AccountScreen';
import { SuggestionScreen } from '../Screen/SuggestionScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

const SuggestionIcon = (props) => <Icon {...props} name="bulb-outline" />;

const AccountIcon = (props) => <Icon {...props} name="person-outline" />;

const useBottomNavigationState = (initialState = 0) => {
	const [selectedIndex, setSelectedIndex] = React.useState(initialState);
	return { selectedIndex, onSelect: setSelectedIndex };
};

const BottomTabBar = ({ navigation, state }) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={(index) => navigation.navigate(state.routeNames[index])}>
		<BottomNavigationTab icon={SearchIcon} />
		<BottomNavigationTab icon={SuggestionIcon} />
		<BottomNavigationTab icon={AccountIcon} />
	</BottomNavigation>
);

export const HomeNavigator = () => (
	<Navigator
		{...useBottomNavigationState()}
		tabBar={(props) => <BottomTabBar {...props} />}>
		<Screen name="Search" component={SearchScreen} />
		<Screen name="Suggestion" component={SuggestionScreen} />
		<Screen name="Account" component={AccountScreen} />
	</Navigator>
);
