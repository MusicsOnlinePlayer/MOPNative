import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar, Spinner, Icon, Button,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { LikeMusic } from '../../../Api/Music/Music';
import TrackPlayer from '../../Player/TrackPlayer';
import { CONTEXT_PLAYLIST } from '../Extras/Constants';
import { LikeMusicButton } from '../Extras/LikeMusicButton';

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

export class MusicItem extends React.PureComponent {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired,
		Artist: PropTypes.string.isRequired,
		AlbumId: PropTypes.shape({
			ImagePathDeezer: PropTypes.string,
			Image: PropTypes.string,
		}).isRequired,
		ContextType: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			IsLoadingFilePath: false,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = async () => {
		const { ContextType, _id } = this.props;
		if (ContextType !== CONTEXT_PLAYLIST) {
			this.setState({ IsLoadingFilePath: true });

			if (this._IsMounted) {
				await TrackPlayer.getInstance().AddAndPlay(this.props);
			}
			this.setState({ IsLoadingFilePath: false });
		} else {
			TrackPlayer.getInstance().ChangePlayingTrack(_id);
		}
	}

	OnAddPress = async () => {
		this.setState({ IsLoadingFilePath: true });
		if (this._IsMounted) {
			await TrackPlayer.getInstance().Add(this.props);
		}
		this.setState({ IsLoadingFilePath: false });
	}

	render() {
		const { IsLoadingFilePath } = this.state;
		const {
			_id,
			ContextType,
			Title,
			Artist,
			AlbumId,
		} = this.props;

		const { ImagePathDeezer, Image } = AlbumId;

		let MusicImage;
		if (ImagePathDeezer || Image) {
			MusicImage = () => (
				<Avatar
					ImageComponent={ImageBackground}
					shape="square"
					source={{
						uri: ImagePathDeezer || `data:image/jpeg;base64,${Image.toString(
							'base64',
						)}`,
					}}
				/>
			);
		} else {
			MusicImage = () => (
				<Avatar
					ImageComponent={ImageBackground}
					shape="square"
					source={require('../../../Assets/noMusic.jpg')}
				/>
			);
		}

		if (IsLoadingFilePath) {
			MusicImage = () => (
				<Spinner size="large" />
			);
		}

		// TODO Implement likeState
		const Controls = () => (
			<>
				<LikeMusicButton defaultLikeState={false} onLike={() => LikeMusic(_id)} />
				{ContextType !== CONTEXT_PLAYLIST && (
					<Button
						onPress={this.OnAddPress}
						accessoryLeft={PlusIcon}
						appearance="ghost"
						status="basic"
					/>
				)}
			</>
		);

		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={Title}
				description={Artist}
				accessoryLeft={MusicImage}
				accessoryRight={Controls}
			/>
		);
	}
}
