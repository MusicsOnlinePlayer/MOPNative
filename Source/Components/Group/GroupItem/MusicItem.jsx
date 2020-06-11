import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar, Spinner, Icon, Button,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetMusicById, LikeMusic } from '../../../Api/Music/Music';
import TrackPlayer from '../../Player/TrackPlayer';
import { CONTEXT_PLAYLIST } from '../Extras/Constants';
import { LikeMusicButton } from '../Extras/LikeMusicButton';

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

class MusicItemClass extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		ContextType: PropTypes.string.isRequired,
		onDataReceived: PropTypes.func,
	}

	static defaultProps = {
		onDataReceived: () => { },
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsLoadingFilePath: false,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
		const { id, onDataReceived } = this.props;
		GetMusicById(id)
			.then((ApiResult) => {
				if (this._IsMounted) {
					this.setState({
						ApiResult,
					});
					onDataReceived(ApiResult);
				}
			})
			.catch();
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = () => {
		const { ApiResult } = this.state;
		const { ContextType, id } = this.props;
		if (ApiResult) {
			if (ContextType !== CONTEXT_PLAYLIST) {
				this.setState({ IsLoadingFilePath: true });

				if (this._IsMounted) {
					this.setState({ IsLoadingFilePath: false });
					TrackPlayer.getInstance().AddAndPlay(ApiResult);
				}
			} else {
				TrackPlayer.getInstance().ChangePlayingTrack(id);
			}
		}
	}

	OnAddPress = () => {
		const { ApiResult } = this.state;
		if (ApiResult) {
			this.setState({ IsLoadingFilePath: true });
			if (this._IsMounted) {
				this.setState({ IsLoadingFilePath: false });
				TrackPlayer.getInstance().Add(ApiResult);
			}
		}
	}

	render() {
		const { ApiResult, IsLoadingFilePath } = this.state;
		const { ContextType, id } = this.props;

		let MusicImage; let
			Controls;

		if (ApiResult) {
			if (ApiResult.ImagePathDeezer || ApiResult.Image) {
				MusicImage = () => (
					<Avatar
						ImageComponent={ImageBackground}
						shape="square"
						source={{
							uri: ApiResult.ImagePathDeezer
								? ApiResult.ImagePathDeezer
								: `data:image/jpeg;base64,${ApiResult.Image.toString(
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

			Controls = () => (
				<>
					<LikeMusicButton defaultLikeState={ApiResult.IsLiked} onLike={() => LikeMusic(id)} />
					<Button onPress={this.OnAddPress} accessoryLeft={PlusIcon} appearance="ghost" status="basic" />
				</>
			);
		}

		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={ApiResult ? ApiResult.Title : 'Loading'}
				description={ApiResult ? ApiResult.Artist : 'Loading'}
				accessoryLeft={ApiResult ? MusicImage : undefined}
				accessoryRight={ApiResult && ContextType !== CONTEXT_PLAYLIST ? Controls : undefined}
			/>
		);
	}
}

//! Weird
export const MusicItem = ({ item }) => (
	<MusicItemClass
		ContextType={item.ContextType}
		id={item.id}
	/>
);

MusicItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
		ContextType: PropTypes.string,
	}).isRequired,
};
