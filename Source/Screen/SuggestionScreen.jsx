import React from 'react';
import { Layout } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';


export const SuggestionScreen = () => (
	<>
		<TopBar subtitle="Suggestions" />
		<Layout style={{ height: '100%', padding: '2%' }} level="2" />
	</>
);
