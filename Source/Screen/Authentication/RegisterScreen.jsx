import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Layout, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Screen } from 'react-native-screens';
import { Register } from '../../Api/Authentication/Auth';
import { LogMyAccount } from '../../Action/AccountAction';

const RegisterScreenConnected = ({
	dispatch,
	navigation,
}) => {
	const {
		register, handleSubmit, setValue, errors,
	} = useForm();
	const [status, SetStatus] = React.useState('primary');

	React.useEffect(() => {
		register(
			{ name: 'name' },
			{ required: true, minLength: 3, maxLength: 20 },
		);
		register({ name: 'password' }, { required: true, minLength: 8 });
	}, [register]);

	const onSubmit = (data) => {
		SetStatus('basic');
		Register(data)
			.then((isLoggedIn) => {
				if (isLoggedIn) {
					SetStatus('success');
					dispatch(LogMyAccount());
					navigation.navigate('Home');
					SetStatus('primary');
				} else {
					SetStatus('warning');
				}
			})
			.catch((err) => {
				console.error(err);
				SetStatus('danger');
			});
	};

	return (
		<Screen>
			<Layout
				style={{
					height: '100%',
					paddingLeft: '6%',
					paddingRight: '6%',
					paddingTop: '2%',
				}}
				level="2"
			>

				<Input
					label="Username"
					name="name"
					placeholder="Enter your username"
					status={status}
					caption={
						errors.username && 'Username is required and must be valid.'
					}
					onChangeText={(text) => setValue('name', text, true)}
					style={{ marginTop: '1%', marginBottom: '1%' }}
				/>
				<Input
					label="Password"
					name="password"
					autoCompleteType="password"
					placeholder="Enter your password"
					status={status}
					caption={
						errors.password
					&& 'Password is required and should be at least 8 characters.'
					}
					textContentType="password"
					secureTextEntry
					onChangeText={(text) => setValue('password', text, true)}
					style={{ marginTop: '1%', marginBottom: '4%' }}
				/>

				<Button title="Submit" onPress={handleSubmit(onSubmit)}>
					Register
				</Button>
				<Button
					style={{ marginTop: '1%', marginBottom: '4%' }}
					onPress={() => navigation.navigate('Login')}
					appearance="ghost"
				>
					Use an existing account
				</Button>
				<Button
					style={{ marginTop: '2%', marginBottom: '4%' }}
					onPress={() => navigation.navigate('Settings')}
					appearance="ghost"
				>
					Settings
				</Button>
			</Layout>
		</Screen>

	);
};

RegisterScreenConnected.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
};

const RegisterScreen = connect()(RegisterScreenConnected);

export default RegisterScreen;
