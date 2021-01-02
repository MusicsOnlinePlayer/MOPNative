import React from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { View } from 'react-native';

export const SplashScreen = () => (
	<Layout
		style={{
			height: '100%',
			paddingLeft: '6%',
			paddingRight: '6%',
			paddingTop: '20%',
		}}
		level="2"
	>
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Spinner />
			<Text>Loading account...</Text>
		</View>
	</Layout>
);
