import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetMusicById, GetFilePathById } from '../../../Api/Music/Music';
import TrackPlayer from '../../Player/TrackPlayer';

class MusicItemClass extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
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

		if (ApiResult) {
			GetFilePathById(ApiResult._id)
				.then((FilePath) => {
					console.log(FilePath);
					TrackPlayer.getInstance().AddAndPlay(ApiResult, FilePath);
				});
		}
	}

	render() {
		const { ApiResult } = this.state;

		let MusicImage;

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
		}

		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={ApiResult ? ApiResult.Title : 'Loading'}
				description={ApiResult ? ApiResult.Artist : 'Loading'}
				accessoryLeft={ApiResult ? MusicImage : undefined}
			/>
		);
	}
}

//! Weird
export const MusicItem = ({ item }) => <MusicItemClass id={item.id} />;

MusicItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
	}).isRequired,
};
