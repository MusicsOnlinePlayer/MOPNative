import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Spinner, Text, List } from '@ui-kitten/components';
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

		this.state = {};
	}

	render() {
		const {
			IsFetching, DetailType, MusicIds, ShowDetailType, ContextType, Reverse, Count,
		} = this.props;

		if (IsFetching) {
			return (
				<>
					{!ShowDetailType || <Text category="h5">{DetailType}</Text>}
					<View style={styles.loading}>
						<Spinner />
					</View>
				</>
			);
		}

		if (MusicIds) {
			const Musics = MusicIds.map((id) => ({ ContextType, id }));
			const MusicsReversed = Reverse ? [...Musics].reverse() : Musics;
			MusicsReversed.length = Count;
			return (
				<>
					{!ShowDetailType || <Text category="h5">{DetailType}</Text>}
					<List data={MusicsReversed.filter((el) => el != null)} renderItem={MusicItem} />
				</>
			);
		}

		return <></>;
	}
}


export default MusicGroup;
