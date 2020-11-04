import RNTrackPlayer from 'react-native-track-player';
import EventEmitter from 'events';
import { GetMusicUrl, GetMusicBaseUrl } from '../../Api/Music/Music';

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
			RNTrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			RNTrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			RNTrackPlayer.CAPABILITY_STOP,
		];

		const options = {
			capabilities,
			compactCapabilities: capabilities,
			alwaysPauseOnInterruption: true,
		};

		RNTrackPlayer.updateOptions(options);

		this.CustomEvents = new EventEmitter();
	};

	IsPlaying = async () => await RNTrackPlayer.getState() === RNTrackPlayer.STATE_PLAYING

	Play = () => RNTrackPlayer.play();

	Pause = () => RNTrackPlayer.pause();

	GetCurrentTrack = async () => await RNTrackPlayer.getTrack(await RNTrackPlayer.getCurrentTrack())

	AddEvent = (type, cb) => RNTrackPlayer.addEventListener(type, cb)

	AddAndPlay = async (MusicFromApi) => {
		await this.RemoveAllTracks();
		await this.Add(MusicFromApi);
		await RNTrackPlayer.play();
	}

	RemoveAllTracks = async () => {
		await RNTrackPlayer.reset();
	}

	Add = async (MusicFromApi) => {
		const url = await GetMusicUrl(MusicFromApi._id);
		await RNTrackPlayer.add({
			id: MusicFromApi._id,
			url,
			title: MusicFromApi.Title,
			album: MusicFromApi.Album,
			artist: MusicFromApi.Artist,
			artwork: MusicFromApi.AlbumId.ImagePathDeezer,
		});
		const tracks = await this.GetTracks();
		this.CustomEvents.emit('TrackAdded', tracks);
	}

	AddMultiple = async (MusicsFromApi) => {
		const baseUrl = await GetMusicBaseUrl();
		const MusicsWarped = MusicsFromApi.map((item) => ({
			id: item._id,
			url: baseUrl + item._id,
			title: item.Title,
			album: item.Album,
			artist: item.Artist,
			artwork: item.AlbumId.ImagePathDeezer,
		}));
		await RNTrackPlayer.add(MusicsWarped);
		const tracks = await this.GetTracks();
		this.CustomEvents.emit('TrackAdded', tracks);
		await this.Play();
	}

	GetTracks = async () => {
		const tracks = await RNTrackPlayer.getQueue();
		return tracks.map(({
			id, title, album, artist, artwork,
		}) => ({
			_id: id,
			Title: title,
			Album: album,
			Artist: artist,
			AlbumId: {
				ImagePathDeezer: artwork,
			},
		}));
	}

	ChangePlayingTrack = async (id) => {
		await RNTrackPlayer.skip(id);
	}
}

export default TrackPlayer;
