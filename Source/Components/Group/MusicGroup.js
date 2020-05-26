import React from 'react';
import { Spinner, Text, List } from '@ui-kitten/components';
import { MusicItem } from './GroupItem/MusicItem';

class MusicGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { IsFetching, DetailType, MusicIds } = this.props;

		if (IsFetching) {
			return (
				<>
					<Text category="h5">{DetailType}</Text>
					<Spinner />
				</>
			);
		}

		if (MusicIds) {
			const Musics = MusicIds.map((id) => {
				return { id };
			});

			return (
				<>
					<Text category="h5">{DetailType}</Text>
					<List data={Musics} renderItem={MusicItem} />
				</>
			);
		}

		return <></>;
	}
}

export default MusicGroup;
