import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { PreferenceScreen } from '../Screen/PreferenceScreen';
import { SplashScreen } from '../Screen/SplashScreen';
import { useAccount } from '../Api/Hooks/AccountHooks';
import LoginScreen from '../Screen/Authentication/LoginScreen';
import RegisterScreen from '../Screen/Authentication/RegisterScreen';
import { HomeNavigator } from './Home';
import Header from './TopBar/Header';

const Stack = createStackNavigator();

const MainStack = ({ initialRouteName }) => (
	<Stack.Navigator initialRouteName={initialRouteName}>
		<Stack.Screen name="Login" component={LoginScreen} options={{ header: Header }} />
		<Stack.Screen name="Register" component={RegisterScreen} options={{ header: Header }} />
		<Stack.Screen name="Settings" component={PreferenceScreen} options={{ header: Header }} />
		<Stack.Screen name="Home" component={HomeNavigator} options={{ header: Header, headerShown: false }} />
	</Stack.Navigator>
);

MainStack.propTypes = {
	initialRouteName: PropTypes.string.isRequired,
};

export default () => {
	const { account, hasError } = useAccount();

	if (account) {
		return <MainStack initialRouteName="Home" />;
	}
	if (hasError) {
		return <MainStack initialRouteName="Login" />;
	}
	return <SplashScreen />;
};
