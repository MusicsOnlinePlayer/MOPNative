import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetAlbumById } from '../../../Api/Music/Music';

class AlbumItemClass extends React.PureComponent {
	static propTypes = {
		id: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
		const { id } = this.props;
		GetAlbumById(id)
			.then((ApiResult) => {
				if (this._IsMounted) {
					this.setState({
						ApiResult,
					});
				}
			})
			.catch();
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = async () => {
		// const { ApiResult } = this.state;
		// const { id } = this.props;
		// if (ApiResult) {

		// }
	}

	render() {
		const { ApiResult } = this.state;

		let AlbumImage;

		if (ApiResult) {
			if (ApiResult.ImagePathDeezer || ApiResult.Image) {
				AlbumImage = () => (
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
				AlbumImage = () => (
					<Avatar
						ImageComponent={ImageBackground}
						shape="rounded"
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
				title={ApiResult ? ApiResult.Name : 'Loading'}
				description={ApiResult ? ApiResult.Artist : 'Loading'}
				accessoryLeft={ApiResult ? AlbumImage : undefined}
			/>
		);
	}
}

//! Weird
export const AlbumItem = ({ item }) => (
	<AlbumItemClass
		id={item.id}
	/>
);

AlbumItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
	}).isRequired,
};
