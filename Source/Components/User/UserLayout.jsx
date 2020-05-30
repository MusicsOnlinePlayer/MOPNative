import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { Header } from './UserExtras/Header';
import { Logout, GetAccount } from '../../Api/Authentication/Auth';

export function UserLayout({ IsLogged, OnRedirectLogin }) {
	const [account, setAccount] = React.useState(undefined);

	React.useEffect(() => {
		if (!account) {
			GetAccount()
				.then((ApiAccount) => {
					setAccount(ApiAccount);
				})
				.catch(() => {
					setAccount(undefined);
					OnRedirectLogin();
				});
		}
	});

	const OnLogoutPress = () => {
		Logout()
			.then(() => {
				setAccount(undefined);
				OnRedirectLogin();
			})
			.catch(() => {});
	};

	if (IsLogged && account) {
		return (
			<Layout style={{ height: '100%' }}>
				<Header Username={account.username} Email="Coming soon" />
				<View style={{ padding: 16 }}>
					<Button onPress={OnLogoutPress}>Logout</Button>
				</View>
			</Layout>
		);
	}
	return (
		<Layout style={{ height: '100%' }}>
			<View style={{ padding: 16 }}>
				<Text category="h1">Not logged</Text>
				<Button onPress={OnRedirectLogin}>Login</Button>
			</View>
		</Layout>
	);
}

UserLayout.propTypes = {
	IsLogged: PropTypes.bool.isRequired,
	OnRedirectLogin: PropTypes.func.isRequired,
};
