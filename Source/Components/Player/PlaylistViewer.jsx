import React from 'react';
import { Layout } from '@ui-kitten/components';
import TrackPlayer from './TrackPlayer';
import MusicGroup from '../Group/MusicGroup';
import { CONTEXT_PLAYLIST } from '../Group/Extras/Constants';

class PlaylistViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Musics: [],
			IsFetching: false,
		};
	}

	componentDidMount = async () => {
		this.setState({ IsFetching: true });
		this.setState({
			Musics: await TrackPlayer.getInstance().GetTracks(),
			IsFetching: false,
		});
		TrackPlayer.getInstance().CustomEvents.on('TrackAdded', this.NewTrackAdded);
	}

	componentWillUnmount() {
		TrackPlayer.getInstance().CustomEvents.removeListener('TrackAdded', this.NewTrackAdded);
	}

	NewTrackAdded = (Tracks) => {
		this.setState({ IsFetching: true });
		this.setState({ Musics: Tracks, IsFetching: false });
	}

	render() {
		const { Musics, IsFetching } = this.state;
		return (
			<Layout level="2" style={{ height: '100%' }}>
				<MusicGroup
					DetailType="Current Playlist"
					ShowDetailType
					ContextType={CONTEXT_PLAYLIST}
					Musics={Musics}
					IsFetching={IsFetching}
				/>
			</Layout>
		);
	}
}

export { PlaylistViewer };
