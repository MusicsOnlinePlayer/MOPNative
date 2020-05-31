import React from 'react';
import { ListItem, Avatar } from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import TrackPlayer from '../TrackPlayer';
import { PlayPauseToggle } from './PlayPauseToggle';

class PlayerSmallControls extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			album: '',
			ImageUrl: '',
		};
	}

	componentDidMount() {
		TrackPlayer.getInstance().AddEvent('playback-track-changed', async () => {
			TrackPlayer.getInstance()
				.GetCurrentTrack()
				.then((data) => {
					if (data) {
						console.log(data);
						this.setState({
							title: data.title,
							album: data.album,
							ImageUrl: data.artwork,
						});
					}
				});
		});
	}

	render() {
		const {
			title,
			album,
			ImageUrl,
		} = this.state;
		if (title) {
			const MusicImage = () => (
				<Avatar
					ImageComponent={ImageBackground}
					shape="square"
					source={{
						uri: ImageUrl || require('../../../Assets/noMusic.jpg'),
					}}
				/>
			);

			return (
				<ListItem
					title={title}
					description={album}
					accessoryRight={PlayPauseToggle}
					accessoryLeft={MusicImage}
				/>
			);
		}
		return <></>;
	}
}

export { PlayerSmallControls };
