import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
	Spinner, List, ListItem,
} from '@ui-kitten/components';
import { ArtistItem } from './GroupItem/ArtistItem';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class ArtistGroup extends React.Component {
	static propTypes = {
		IsFetching: PropTypes.bool.isRequired,
		DetailType: PropTypes.string,
		Artists: PropTypes.arrayOf(PropTypes.shape({

		})),
		ShowDetailType: PropTypes.bool,
		navigation: PropTypes.shape({
			navigate: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		DetailType: undefined,
		Artists: undefined,
		ShowDetailType: false,
	}

	OnItemClick = (Artist) => {
		const { navigation } = this.props;
		navigation.navigate('Artist', { Artist });
	}

	render() {
		const {
			IsFetching, DetailType, Artists, ShowDetailType,
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

		if (Artists) {
			const ArtistItemWithEvent = (props) => (
				<ArtistItem
					{...props}
					OnItemClick={this.OnItemClick}
				/>
			);

			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" onPress={this.onDetailPress} />}

					<List
						data={Artists}
						renderItem={ArtistItemWithEvent}
						onEndReachedThreshold={0.5}
						onEndReached={() => {}}
					/>
				</>
			);
		}

		return <></>;
	}
}

export default ArtistGroup;
