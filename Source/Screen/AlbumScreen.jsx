import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { CONTEXT_SEARCH } from '../Components/Group/Extras/Constants';
import { TopBar } from '../Navigator/TopBar';
import MusicGroup from '../Components/Group/MusicGroup';

const AlbumScreen = ({ route }) => {
	const {
		Album,
	} = route.params;

	return (
		<>
			<TopBar subtitle="Album" />
			<Layout level="2" style={{ height: '100%' }}>
				<MusicGroup
					DetailType={Album.Name}
					Musics={Album.MusicsId}
					CommonImage={Album.Image}
					CommonImageDz={Album.ImagePathDeezer}
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
			Album: PropTypes.shape({
				Name: PropTypes.string,
				MusicsId: PropTypes.arrayOf(PropTypes.any),
				Image: PropTypes.string,
				ImagePathDeezer: PropTypes.string,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export default AlbumScreen;
