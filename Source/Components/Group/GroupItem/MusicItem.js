import React from 'react';
import { ListItem, Avatar } from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetMusicById } from '../../../Api/Music/Music';

class MusicItemClass extends React.Component {
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
				title={ApiResult ? ApiResult.Title : 'Loading'}
				description={ApiResult ? ApiResult.Artist : 'Loading'}
				accessoryLeft={ApiResult ? MusicImage : undefined}
			/>
		);
	}
}

export const MusicItem = ({ item }) => {
	//! really weird
	return <MusicItemClass id={item.id} />;
};
