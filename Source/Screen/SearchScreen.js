import React from 'react';
import { Icon, Input, Layout, Divider } from '@ui-kitten/components';
import { SearchMusic } from '../Api/Music/Search';
import MusicGroup from '../Components/Group/MusicGroup';

const SearchIcon = (props) => <Icon {...props} name="search" />;

export class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SearchValue: '',
			MusicIds: [],
		};
	}

	SetSearchValue = (value) => {
		this.setState({
			SearchValue: value,
		});
	};

	OnSearchSubmit = () => {
		this.setState({ MusicIds: [] });
		SearchMusic(this.state.SearchValue)
			.then((MusicIds) => {
				this.setState({ MusicIds });
			})
			.catch();
	};

	render() {
		const { MusicIds } = this.state;

		return (
			<Layout style={{ height: '100%' }}>
				<Input
					value={this.state.SearchValue}
					style={{ padding: '1%' }}
					placeholder="Search for musics"
					accessoryLeft={SearchIcon}
					onChangeText={this.SetSearchValue}
					onSubmitEditing={this.OnSearchSubmit}
					returnKeyType="search"
				/>
				<Divider />
				<MusicGroup DetailType="Musics" MusicIds={MusicIds} />
			</Layout>
		);
	}
}
