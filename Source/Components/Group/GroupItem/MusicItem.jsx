import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar, Spinner, Icon, Button,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetMusicById, GetFilePathById } from '../../../Api/Music/Music';
import TrackPlayer from '../../Player/TrackPlayer';
import { CONTEXT_PLAYLIST } from '../Extras/Constants';

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

class MusicItemClass extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		ContextType: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsLoadingFilePath: false,
		};
	}

	componentDidMount() {
		const { id } = this.props;
		GetMusicById(id)
			.then((ApiResult) => {
				this.setState({
					ApiResult,
				});
			})
			.catch();
	}

	onPress = () => {
		const { ApiResult } = this.state;
		const { ContextType, id } = this.props;
		if (ApiResult) {
			if (ContextType !== CONTEXT_PLAYLIST) {
				this.setState({ IsLoadingFilePath: true });
				GetFilePathById(ApiResult._id)
					.then((FilePath) => {
						this.setState({ IsLoadingFilePath: false });
						TrackPlayer.getInstance().AddAndPlay(ApiResult, FilePath);
					});
			} else {
				TrackPlayer.getInstance().ChangePlayingTrack(id);
			}
		}
	}

	OnAddPress = () => {
		const { ApiResult } = this.state;
		if (ApiResult) {
			this.setState({ IsLoadingFilePath: true });
			GetFilePathById(ApiResult._id)
				.then((FilePath) => {
					this.setState({ IsLoadingFilePath: false });
					TrackPlayer.getInstance().Add(ApiResult, FilePath);
				});
		}
	}

	render() {
		const { ApiResult, IsLoadingFilePath } = this.state;
		const { ContextType } = this.props;

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

			Controls = () => (<Button onPress={this.OnAddPress} appearance="ghost" accessoryLeft={PlusIcon} />);
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
