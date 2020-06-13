import React from 'react';
import {
	Icon, Input, Layout, TabView, Tab,
} from '@ui-kitten/components';
import { CONTEXT_SEARCH } from '../Components/Group/Extras/Constants';
import { SearchMusic, SearchAlbum } from '../Api/Music/Search';
import MusicGroup from '../Components/Group/MusicGroup';
import { TopBar } from '../Navigator/TopBar';
import AlbumGroup from '../Components/Group/AlbumGroup';

const SearchIcon = (props) => <Icon {...props} name="search" />;

export class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SearchValue: '',
			MusicIds: undefined,
			AlbumIds: undefined,

			IsFetchingMusics: false,
			IsFetchingAlbums: false,

			selectedIndex: 0,
		};
	}

	SetSearchValue = (value) => {
		this.setState({
			SearchValue: value,
		});
	};

	OnSearchSubmit = () => {
		const { SearchValue } = this.state;

		this.setState({
			MusicIds: undefined,
			AlbumIds: undefined,
			IsFetchingMusics: true,
			IsFetchingAlbums: true,
		});

		SearchMusic(SearchValue)
			.then((MusicIds) => {
				this.setState({ MusicIds, IsFetchingMusics: false });
			})
			.catch();

		SearchAlbum(SearchValue)
			.then((AlbumIds) => {
				this.setState({ AlbumIds, IsFetchingAlbums: false });
			})
			.catch();
	};

	render() {
		const {
			MusicIds,
			AlbumIds,
			IsFetchingMusics,
			IsFetchingAlbums,
			SearchValue,
			selectedIndex,
		} = this.state;

		return (
			<>
				<TopBar subtitle="Search" />

				<Layout style={{ height: '100%' }} level="1">
					<Input
						value={SearchValue}
						style={{ padding: '2%' }}
						placeholder="Search for musics"
						accessoryLeft={SearchIcon}
						onChangeText={this.SetSearchValue}
						onSubmitEditing={this.OnSearchSubmit}
						returnKeyType="search"
					/>
					<Layout level="2" style={{ height: '100%' }}>
						<TabView
							selectedIndex={selectedIndex}
							onSelect={(index) => this.setState({ selectedIndex: index })}
						>
							<Tab title="Musics">
								<MusicGroup
									DetailType="Musics"
									ContextType={CONTEXT_SEARCH}
									MusicIds={MusicIds}
									IsFetching={IsFetchingMusics}
								/>

							</Tab>
							<Tab title="Albums">
								<AlbumGroup
									DetailType="Albums"
									AlbumIds={AlbumIds}
									IsFetching={IsFetchingAlbums}
								/>
							</Tab>
							<Tab title="Artists" />
						</TabView>

					</Layout>
				</Layout>
			</>
		);
	}
}
