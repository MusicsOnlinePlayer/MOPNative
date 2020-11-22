import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import AlbumGroup from '../Components/Group/AlbumGroup';
import { useArtistById } from '../Api/Hooks/ArtistHooks';

const ArtistScreen = ({ route, navigation }) => {
	const {
		ArtistId,
	} = route.params;

	const { artist, hasError } = useArtistById(ArtistId);

	return (
		<>
			<TopBar subtitle="Artist" />
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
