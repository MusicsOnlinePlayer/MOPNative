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
	}

	static defaultProps = {
		DetailType: undefined,
		MusicIds: undefined,
		ShowDetailType: false,
	}

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const {
			IsFetching, DetailType, MusicIds, ShowDetailType,
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
			const Musics = MusicIds.map((id) => ({ id }));

			return (
				<>
					{!ShowDetailType || <Text category="h5">{DetailType}</Text>}
					<List data={Musics} renderItem={MusicItem} />
				</>
			);
		}

		return <></>;
	}
}


export default MusicGroup;
