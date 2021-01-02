import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { useAlbumById } from '../Api/Hooks/AlbumHooks';
import { CONTEXT_SEARCH } from '../Components/Group/Extras/Constants';
import MusicGroup from '../Components/Group/MusicGroup';

const AlbumScreen = ({ route }) => {
	const {
		AlbumId,
	} = route.params;

	const { album, hasError } = useAlbumById(AlbumId);

	return (
		<>
			<Layout level="2" style={{ height: '100%' }}>

				<MusicGroup
					DetailType={album && album.Name}
					Musics={album && album.MusicsId}
					CommonImage={album && album.Image}
					CommonImageDz={album && album.ImagePathDeezer}
					IsFetching={album === undefined}
					ShowDetailType
					ContextType={CONTEXT_SEARCH}
				/>
			</Layout>
		</>
	);
};

AlbumScreen.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			AlbumId: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default AlbumScreen;
