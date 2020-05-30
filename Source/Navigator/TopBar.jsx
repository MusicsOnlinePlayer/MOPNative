import React from 'react';
import { TopNavigation } from '@ui-kitten/components';
import PropTypes from 'prop-types';


export const TopBar = ({ title, subtitle }) => (
	<>
		<TopNavigation
			title={title}
			subtitle={subtitle}
			alignment="center"
		/>
	</>
);

TopBar.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
};

TopBar.defaultProps = {
	title: 'MOP',
	subtitle: '',
};
