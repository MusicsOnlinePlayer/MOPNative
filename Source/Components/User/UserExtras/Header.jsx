import React from 'react';
import PropTypes from 'prop-types';
import { Layout, StyleService, Text } from '@ui-kitten/components';

const styles = StyleService.create({
	header: {
		padding: 16,
	},
});

export function Header({ Username, Email }) {
	return (
		<Layout style={styles.header} level="1">
			<Text category="h4">{Username}</Text>
			<Text appearance="hint" category="s1">
				{Email}
			</Text>
		</Layout>
	);
}

Header.propTypes = {
	Username: PropTypes.string.isRequired,
	Email: PropTypes.string.isRequired,
};
