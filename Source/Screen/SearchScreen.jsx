import React from 'react';
import {
	Icon, Input, Layout,
} from '@ui-kitten/components';
import { SearchMusic } from '../Api/Music/Search';
import MusicGroup from '../Components/Group/MusicGroup';
import { TopBar } from '../Navigator/TopBar';

const SearchIcon = (props) => <Icon {...props} name="search" />;

export class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SearchValue: '',
			MusicIds: undefined,

			IsFetchingMusics: false,
		};
	}

	SetSearchValue = (value) => {
		this.setState({
			SearchValue: value,
		});
	};

	OnSearchSubmit = () => {
		const { SearchValue } = this.state;

		this.setState({ MusicIds: undefined, IsFetchingMusics: true });

		SearchMusic(SearchValue)
			.then((MusicIds) => {
				this.setState({ MusicIds, IsFetchingMusics: false });
			})

			.catch();
	};

	render() {
		const { MusicIds, IsFetchingMusics, SearchValue } = this.state;

		return (
			<>
				<TopBar subtitle="Search" />

				<Layout style={{ height: '100%', padding: '2%' }}>
					<Input
						value={SearchValue}
						placeholder="Search for musics"
						accessoryLeft={SearchIcon}
						onChangeText={this.SetSearchValue}
						onSubmitEditing={this.OnSearchSubmit}
						returnKeyType="search"
					/>

					<MusicGroup
						DetailType="Musics"
						MusicIds={MusicIds}
						IsFetching={IsFetchingMusics}
					/>
				</Layout>
			</>
		);
	}
}
