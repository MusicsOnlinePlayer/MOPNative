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
				left: 0,
				right: 0,
				bottom: 0,
				padding: '2%',
				alignItems: 'center',
			}}
			>
				<PlayerSmallControls />
			</View>
		);
	}
}

export { PlayerOverlay };
