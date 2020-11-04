import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
	Spinner, List, ListItem,
} from '@ui-kitten/components';
import { MusicItem } from './GroupItem/MusicItem';
import TrackPlayer from '../Player/TrackPlayer';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class MusicGroup extends React.Component {
	static propTypes = {
		IsFetching: PropTypes.bool.isRequired,
		DetailType: PropTypes.string,
		Musics: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			Title: PropTypes.string,
			Album: PropTypes.string,
			Artist: PropTypes.string,
			ImagePathDeezer: PropTypes.string,
			Image: PropTypes.string,
		})),
		ShowDetailType: PropTypes.bool,
		ContextType: PropTypes.string.isRequired,
		OnEndReached: PropTypes.func,
	}

	static defaultProps = {
		DetailType: undefined,
		Musics: undefined,
		ShowDetailType: false,
		OnEndReached: () => {},
	}

	onDetailPress = () => {
		const { Musics } = this.props;
		if (Musics) {
			TrackPlayer.getInstance().RemoveAllTracks();
			TrackPlayer.getInstance().AddMultiple(Musics);
		}
	}

	render() {
		const {
			IsFetching,
			DetailType,
			Musics,
			ShowDetailType,
			ContextType,
			OnEndReached,
		} = this.props;

		if (IsFetching) {
			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" />}
					<View style={styles.loading}>
						<Spinner />
					</View>
				</>
			);
		}
		if (Musics) {
			const MusicItemWithEvent = ({ item }) => (
				<MusicItem {...item} />
			);

			const MusicsList = Musics.map((m) => ({ ContextType, ...m }));

			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" onPress={this.onDetailPress} />}

					<List
						data={MusicsList}
						renderItem={MusicItemWithEvent}
						onEndReachedThreshold={0.5}
						onEndReached={OnEndReached}
					/>
				</>
			);
		}

		return <></>;
	}
}

export default MusicGroup;
