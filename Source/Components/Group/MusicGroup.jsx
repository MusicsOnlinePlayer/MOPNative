import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
	Spinner, Text, List, ListItem,
} from '@ui-kitten/components';
import { MusicItem } from './GroupItem/MusicItem';

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
		MusicIds: PropTypes.arrayOf(PropTypes.string),
		ShowDetailType: PropTypes.bool,
		ContextType: PropTypes.string.isRequired,
		Reverse: PropTypes.bool,
		Count: PropTypes.number,
	}

	static defaultProps = {
		DetailType: undefined,
		MusicIds: undefined,
		ShowDetailType: false,
		Reverse: false,
		Count: 10,
	}

	constructor(props) {
		super(props);

		this.state = {
			Musics: [],
		};
	}

	onMusicDataReceived = (MusicApiResult) => {
		this.setState((prev) => ({
			Musics: [...prev.Musics, MusicApiResult],
		}));
	}

	render() {
		const {
			IsFetching, DetailType, MusicIds, ShowDetailType, ContextType, Reverse, Count,
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

		if (MusicIds) {
			const MusicItemWithEvent = (props) => (
				<MusicItem
					{...props}
					onDataReceived={this.onMusicDataReceived}
				/>
			);

			const Musics = MusicIds.map((id) => ({ ContextType, id }));
			const MusicsReversed = Reverse ? [...Musics].reverse() : Musics;
			MusicsReversed.length = Count;
			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" />}

					<List data={MusicsReversed.filter((el) => el != null)} renderItem={MusicItemWithEvent} />
				</>
			);
		}

		return <></>;
	}
}


export default MusicGroup;
