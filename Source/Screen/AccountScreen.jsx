import React from 'react';
import { connect } from 'react-redux';
import { ViewPager } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { TopBar } from '../Navigator/TopBar';
import { LoginLayout } from '../Components/Authentication/LoginLayout';
import { RegisterLayout } from '../Components/Authentication/RegisterLayout';
import { UserLayout } from '../Components/User/UserLayout';

const ScreenName = ['Login', 'Register', 'Account'];

const mapStateToProps = (state) => ({
	IsLogged: state.UserAccountReducer.IsLogged,
});

const AccountScreenConnected = ({ IsLogged }) => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<>
			<TopBar subtitle={ScreenName[selectedIndex]} />
			<ViewPager
				selectedIndex={selectedIndex}
				onSelect={(index) => setSelectedIndex(index)}
			>
				<LoginLayout
					ChangeToRegister={() => setSelectedIndex(1)}
					OnLoginSuccess={() => setSelectedIndex(2)}
				/>
				<RegisterLayout
					ChangeToLogin={() => setSelectedIndex(0)}
					OnRegisterSuccess={() => setSelectedIndex(2)}
				/>
				<UserLayout
					IsLogged={IsLogged}
					OnRedirectLogin={() => setSelectedIndex(0)}
				/>
			</ViewPager>
		</>
	);
};

AccountScreenConnected.propTypes = {
	IsLogged: PropTypes.bool.isRequired,
};

const AccountScreen = connect(mapStateToProps)(AccountScreenConnected);

export { AccountScreen };
