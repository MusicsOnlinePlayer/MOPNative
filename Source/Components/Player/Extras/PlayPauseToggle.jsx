import React from 'react';
import { Button, Icon } from '@ui-kitten/components';
import TrackPlayer from '../TrackPlayer';

const PlayIcon = (props) => <Icon {...props} name="play-circle-outline" />;

const PauseIcon = (props) => <Icon {...props} name="pause-circle-outline" />;

class PlayPauseToggleClass extends React.Component {
	constructor(props) {
		super(props);
		this._IsMounted = false;
		this.state = {
			IsPlaying: false,
		};
	}

	componentDidMount() {
		this._IsMounted = true;
		TrackPlayer.getInstance().AddEvent('playback-state', async () => {
			if (this._IsMounted) {
				this.setState({
					IsPlaying: await TrackPlayer.getInstance().IsPlaying(),
				});
			}
		});
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	OnButtonPress = () => {
		const { IsPlaying } = this.state;
		IsPlaying ? TrackPlayer.getInstance().Pause() : TrackPlayer.getInstance().Play();
	};

	render() {
		const { IsPlaying } = this.state;

		return (
			<Button
				onPress={this.OnButtonPress}
				appearance="ghost"
				accessoryLeft={IsPlaying ? PauseIcon : PlayIcon}
			/>
		);
	}
}

const PlayPauseToggle = (props) => <PlayPauseToggleClass {...props} />;

export { PlayPauseToggle };
