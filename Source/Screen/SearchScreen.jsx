import React from 'react';
import PropTypes from 'prop-types';
import {
	Icon, Input, Layout, TabView, Tab,
} from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar/TopBar';
import { CONTEXT_SEARCH } from '../Components/Group/Extras/Constants';
import { SearchMusic, SearchAlbum, SearchArtist } from '../Api/Music/Search';

import MusicGroup from '../Components/Group/MusicGroup';
import AlbumGroup from '../Components/Group/AlbumGroup';
import ArtistGroup from '../Components/Group/ArtistGroup';

const SearchIcon = (props) => <Icon {...props} name="search" />;

export class SearchScreen extends React.Component {
	static propTypes = {
		navigation: PropTypes.shape({}).isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			SearchValue: '',
			Musics: undefined,
			Albums: undefined,
			Artists: undefined,

			IsFetchingMusics: false,
			IsFetchingAlbums: false,
			IsFetchingArtists: false,

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
			Musics: undefined,
			Albums: undefined,
			Artists: undefined,
			IsFetchingMusics: true,
			IsFetchingAlbums: true,
			IsFetchingArtists: true,
		});

		SearchMusic(SearchValue)
			.then((Musics) => {
				this.setState({ Musics, IsFetchingMusics: false });
			})
			.catch();
		SearchAlbum(SearchValue)
			.then((Albums) => {
				this.setState({ Albums, IsFetchingAlbums: false });
			})
			.catch();
		SearchArtist(SearchValue)
			.then((Artists) => {
				this.setState({ Artists, IsFetchingArtists: false });
			})
			.catch();
	};

	render() {
		const {
			Musics,
			Albums,
			Artists,
			IsFetchingMusics,
			IsFetchingAlbums,
			IsFetchingArtists,
			SearchValue,
			selectedIndex,
		} = this.state;
		const {
			navigation,
		} = this.props;

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
									Musics={Musics}
									IsFetching={IsFetchingMusics}
								/>

							</Tab>
							<Tab title="Albums">
								<AlbumGroup
									DetailType="Albums"
									Albums={Albums}
									IsFetching={IsFetchingAlbums}
									navigation={navigation}
								/>
							</Tab>
							<Tab title="Artists">
								<ArtistGroup
									DetailType="Artists"
									Artists={Artists}
									IsFetching={IsFetchingArtists}
									navigation={navigation}
								/>

							</Tab>
						</TabView>

					</Layout>
				</Layout>
			</>
		);
	}
}
