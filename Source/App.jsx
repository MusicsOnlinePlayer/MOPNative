import React from 'react';
import Axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import RootReducer from './Reducers/RootReducer';
import Main from './Navigator/Main';

const store = createStore(
	RootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
		&& window.__REDUX_DEVTOOLS_EXTENSION__(),
);

Axios.defaults.withCredentials = true;

export default () => (
	<Provider store={store}>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.dark}>
			<NavigationContainer>
				<Main />
			</NavigationContainer>
		</ApplicationProvider>
	</Provider>
);
