import React from 'react';
import { View } from 'react-native';
import { PlayerSmallControls } from './Extras/PlayerSmallControls';

class PlayerOverlay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={{
				position: 'absolute',
				left: '2%',
				right: '2%',
				bottom: '9%',
				alignItems: 'center',
			}}
			>
				<PlayerSmallControls />
			</View>
		);
	}
}

export { PlayerOverlay };
