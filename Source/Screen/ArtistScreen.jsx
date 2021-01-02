import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import AlbumGroup from '../Components/Group/AlbumGroup';
import { useArtistById } from '../Api/Hooks/ArtistHooks';

const ArtistScreen = ({ route, navigation }) => {
	const {
		ArtistId,
	} = route.params;

	const { artist, hasError } = useArtistById(ArtistId);

	return (
		<>
			<Layout level="2" style={{ height: '100%' }}>
				<AlbumGroup
					DetailType={artist && artist.Name}
					Albums={artist && artist.AlbumsId}
					IsFetching={artist === undefined}
					navigation={navigation}
					ShowDetailType
				/>
			</Layout>
		</>
	);
};

ArtistScreen.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			ArtistId: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	navigation: PropTypes.shape({}).isRequired,
};

export default ArtistScreen;
