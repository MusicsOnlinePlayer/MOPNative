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
			artist: '',
			ImageUrl: '',
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
		this.UpdateMusicDetails();
		TrackPlayer.getInstance().AddEvent('playback-track-changed', async () => {
			this.UpdateMusicDetails();
		});
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	UpdateMusicDetails = () => {
		if (this._IsMounted) {
			TrackPlayer.getInstance()
				.GetCurrentTrack()
				.then((data) => {
					if (data) {
						this.setState({
							title: data.title,
							artist: data.artist,
							ImageUrl: data.artwork,
						});
					}
				});
		}
	}

	render() {
		const {
			title,
			artist,
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
					style={{ zIndex: 1 }}
					title={title}
					description={artist}
					accessoryRight={PlayPauseToggle}
					accessoryLeft={MusicImage}
				/>
			);
		}
		return <></>;
	}
}

export { PlayerSmallControls };
