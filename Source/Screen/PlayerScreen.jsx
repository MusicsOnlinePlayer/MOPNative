import React from 'react';
import { Layout } from '@ui-kitten/components';
import { PlaylistViewer } from '../Components/Player/PlaylistViewer';
import { TopBar } from '../Navigator/TopBar';

const PlayerScreen = () => (
	<>
		<TopBar subtitle="Player" />
		<Layout style={{ height: '100%', padding: '2%' }} level="2">
			<PlaylistViewer />
		</Layout>
	</>
);

export { PlayerScreen };
