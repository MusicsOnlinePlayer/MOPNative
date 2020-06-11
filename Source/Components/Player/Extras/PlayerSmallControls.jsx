import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar, Spinner } from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import TrackPlayer from '../TrackPlayer';
import { PlayPauseToggle } from './PlayPauseToggle';

class PlayerSmallControls extends React.Component {
	static propTypes = {
		onPress: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			artist: '',
			ImageUrl: '',
			IsLoading: false,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
		this.UpdateMusicDetails();
		TrackPlayer.getInstance().AddEvent('playback-track-changed', async () => {
			this.UpdateMusicDetails();
		});
		TrackPlayer.getInstance().CustomEvents.on('FilePathLoadStarted', () => {
			if (this._IsMounted) { this.setState({ IsLoading: true }); }
		});
		TrackPlayer.getInstance().CustomEvents.on('FilePathLoadEnded', () => {
			if (this._IsMounted) { this.setState({ IsLoading: false }); }
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
		const { onPress } = this.props;
		const {
			title,
			artist,
			ImageUrl,
			IsLoading,
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

			const Loading = () => (
				<Spinner size="large" />
			);

			return (
				<ListItem
					style={{ zIndex: 1 }}
					title={title}
					description={artist}
					accessoryRight={PlayPauseToggle}
					accessoryLeft={IsLoading ? Loading : MusicImage}
					onPress={onPress}
				/>
			);
		}
		return <></>;
	}
}

export { PlayerSmallControls };
