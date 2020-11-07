import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetValidImageUrl } from '../../../Api/Music/Music';

class ArtistItemClass extends React.PureComponent {
	static propTypes = {
		Artist: PropTypes.shape({
			Name: PropTypes.string,
			ImagePath: PropTypes.string,
		}).isRequired,
		OnItemClick: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			ArtistImageUrl: props.Artist.ImagePath,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		const { Artist } = this.props;
		this._IsMounted = true;
		if (Artist.ImagePath) {
			GetValidImageUrl(Artist.ImagePath)
				.then((ArtistImageUrl) => this.setState({ ArtistImageUrl }));
		}
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = async () => {
		const { OnItemClick, Artist } = this.props;
		OnItemClick(Artist);
	}

	render() {
		const { ArtistImageUrl } = this.state;
		const { Artist } = this.props;

		let ArtistImage;

		if (Artist.ImagePath) {
			ArtistImage = () => (
				<Avatar
					ImageComponent={ImageBackground}
					shape="round"
					source={{ uri: ArtistImageUrl }}
				/>
			);
		} else {
			ArtistImage = () => (
				<Avatar
					ImageComponent={ImageBackground}
					shape="round"
					source={require('../../../Assets/noMusic.jpg')}
				/>
			);
		}

		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={Artist.Name}
				accessoryLeft={ArtistImage}
			/>
		);
	}
}

//! Weird
export const ArtistItem = ({ item, OnItemClick }) => (
	<ArtistItemClass
		Artist={item}
		OnItemClick={OnItemClick}
	/>
);

ArtistItem.propTypes = {
	item: PropTypes.shape({
	}).isRequired,
	OnItemClick: PropTypes.func.isRequired,
};
