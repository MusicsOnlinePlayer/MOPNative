import React from 'react';
import PropTypes from 'prop-types';
import { TopBar } from './TopBar';

const Header = ({ scene, navigation }) => {
	const { options } = scene.descriptor;
	let title;
	if (options.headerTitle) {
		title = options.headerTitle;
	} else {
		title = options.title !== undefined ? options.title : scene.route.name;
	}

	return (
		<TopBar
			subtitle={title}
			leftButton
			leftButtonPress={() => navigation.goBack()}
		/>
	);
};

Header.propTypes = {
	scene: PropTypes.shape({
		descriptor: PropTypes.shape({
			options: PropTypes.shape({
				headerTitle: PropTypes.string,
				title: PropTypes.string,
			}),
		}),
		route: PropTypes.shape({
			name: PropTypes.string,
		}),
	}).isRequired,
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
	}).isRequired,
};

export default Header;
