import React from 'react';
import { ListItem } from '@ui-kitten/components';
import { GetMusicById } from '../../../Api/Music/Music';

class MusicItemClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
		};
	}

	componentDidMount() {
		const { id } = this.props;
		GetMusicById(id)
			.then((ApiResult) => {
				this.setState({
					ApiResult,
				});
			})
			.catch();
	}

	render() {
		const { ApiResult } = this.state;

		return (
			<ListItem
				title={ApiResult ? ApiResult.Title : 'Loading'}
				description={ApiResult ? ApiResult.Artist : 'Loading'}
			/>
		);
	}
}

export const MusicItem = ({ item }) => {
	//! really weird
	return <MusicItemClass id={item.id} />;
};
