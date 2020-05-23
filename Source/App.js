import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { HomeNavigator } from './Navigator/Home';
import { TopBar } from './Navigator/TopBar';

const { Navigator, Screen } = createStackNavigator();

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.dark}>
			<TopBar />
			<NavigationContainer>
				<HomeNavigator />
			</NavigationContainer>
		</ApplicationProvider>
	</>
);
