import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';

class AlbumItemClass extends React.PureComponent {
	static propTypes = {
		Album: PropTypes.shape({
			Name: PropTypes.string,
			ImagePathDeezer: PropTypes.string,
			Image: PropTypes.string,
		}).isRequired,
		OnItemClick: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = async () => {
		const { OnItemClick, Album } = this.props;
		OnItemClick(Album);
	}

	render() {
		const { Album } = this.props;

		let AlbumImage;

		if (Album.ImagePathDeezer || Album.Image) {
			AlbumImage = () => (
				<Avatar
					ImageComponent={ImageBackground}
					shape="rounded"
					source={{
						uri: Album.ImagePathDeezer
							? Album.ImagePathDeezer
							: `data:image/jpeg;base64,${Album.Image.toString(
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

		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={Album.Name}
				accessoryLeft={AlbumImage}
			/>
		);
	}
}

//! Weird
export const AlbumItem = ({ item, OnItemClick }) => (
	<AlbumItemClass
		Album={item}
		OnItemClick={OnItemClick}
	/>
);

AlbumItem.propTypes = {
	item: PropTypes.shape(PropTypes.any).isRequired,
	OnItemClick: PropTypes.func.isRequired,
};
