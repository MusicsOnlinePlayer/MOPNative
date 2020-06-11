import RNTrackPlayer from 'react-native-track-player';
import EventEmitter from 'events';
import { GetFilePathById } from '../../Api/Music/Music';

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
			iosCategoryMode: 'default',
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
		this.Playlist = [];
		this.PlayingIndex = 0;
		RNTrackPlayer.addEventListener('playback-queue-ended', this.OnTrackEnded);
	};

	IsPlaying = async () => await RNTrackPlayer.getState() === RNTrackPlayer.STATE_PLAYING

	Play = () => RNTrackPlayer.play();

	Pause = () => RNTrackPlayer.pause();

	GetCurrentTrack = async () => await RNTrackPlayer.getTrack(await RNTrackPlayer.getCurrentTrack())

	AddEvent = (type, cb) => RNTrackPlayer.addEventListener(type, cb)

	AddAndPlay = async (MusicFromApi, url) => {
		this.ResetPlaylist();
		await this.Add(MusicFromApi, url);
		this.PlayingIndex = this.Playlist.length - 1;
		this.PlayAtIndex();
	}

	Add = async (MusicFromApi) => {
		this.Playlist.push({
			id: MusicFromApi._id,
			title: MusicFromApi.Title,
			album: MusicFromApi.Album,
			artist: MusicFromApi.Artist,
			artwork: MusicFromApi.ImagePathDeezer,
		});
		const tracks = await this.GetTracksIds();
		this.CustomEvents.emit('TrackAdded', tracks);
	}

	GetTracksIds = async () => {
		const tracks = this.Playlist;
		return tracks.map(({ id }) => id);
	}

	ChangePlayingTrack = async (reqId) => {
		this.PlayingIndex = this.Playlist.map(({ id }) => id).indexOf(reqId);
		await this.PlayAtIndex();
	}

	PlayAtIndex = async () => {
		const MusicAtIndex = this.Playlist[this.PlayingIndex];
		this.CustomEvents.emit('FilePathLoadStarted');
		MusicAtIndex.url = await GetFilePathById(MusicAtIndex.id);
		this.CustomEvents.emit('FilePathLoadEnded');
		await RNTrackPlayer.add(MusicAtIndex);
		await RNTrackPlayer.skip(MusicAtIndex.id);
		await RNTrackPlayer.play();
	}

	ResetPlaylist = () => {
		this.Playlist = [];
		this.PlayingIndex = 0;
	}

	OnTrackEnded = () => {
		if (this.PlayingIndex + 1 <= this.Playlist.length - 1) {
			this.PlayingIndex += 1;
			this.PlayAtIndex();
		}
	}
}

export default TrackPlayer;
