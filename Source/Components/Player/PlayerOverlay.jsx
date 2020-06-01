import React from 'react';
import { View } from 'react-native';
import { PlayerSmallControls } from './Extras/PlayerSmallControls';
import { PlayerProgressBar } from './Extras/PlayerProgressBar';

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
				<PlayerProgressBar />
				<PlayerSmallControls />
			</View>
		);
	}
}

export { PlayerOverlay };
