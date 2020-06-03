import RNTrackPlayer from 'react-native-track-player';
import EventEmitter from 'events';

class TrackPlayer {
	static TrackPlayer;

	static getInstance() {
		if (!TrackPlayer.instance) {
			TrackPlayer.instance = new TrackPlayer();
			TrackPlayer.instance.Init();
			return TrackPlayer.instance;
		}

		return TrackPlayer.instance;
	}

	Init = () => {
		RNTrackPlayer.setupPlayer({
			iosCategoryMode: 'spokenAudio',
		});

		const capabilities = [
			RNTrackPlayer.CAPABILITY_PLAY,
			RNTrackPlayer.CAPABILITY_PAUSE,
			RNTrackPlayer.CAPABILITY_SEEK_TO,
		];

		const options = {
			capabilities,
			compactCapabilities: capabilities,
		};

		RNTrackPlayer.updateOptions(options);

		this.CustomEvents = new EventEmitter();
	};

	IsPlaying = async () => await RNTrackPlayer.getState() === RNTrackPlayer.STATE_PLAYING

	Play = () => RNTrackPlayer.play();

	Pause = () => RNTrackPlayer.pause();

	GetCurrentTrack = async () => await RNTrackPlayer.getTrack(await RNTrackPlayer.getCurrentTrack())

	AddEvent = (type, cb) => RNTrackPlayer.addEventListener(type, cb)

	AddAndPlay = async (MusicFromApi, url) => {
		await RNTrackPlayer.reset();
		await this.Add(MusicFromApi, url);
		await RNTrackPlayer.play();
	}

	Add = async (MusicFromApi, url) => {
		await RNTrackPlayer.add({
			id: MusicFromApi._id,
			url,
			title: MusicFromApi.Title,
			album: MusicFromApi.Album,
			artist: MusicFromApi.Artist,
			artwork: MusicFromApi.ImagePathDeezer,
		});
		const tracks = await this.GetTracksIds();
		this.CustomEvents.emit('TrackAdded', tracks);
	}

	GetTracksIds = async () => {
		const tracks = await RNTrackPlayer.getQueue();
		return tracks.map(({ id }) => id);
	}
}

export default TrackPlayer;
